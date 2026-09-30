import assert from "node:assert/strict";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { build } from "vite";

type Css = { [selector: string]: string | Css };

type Item = {
  name: string;
  css?: Css;
  registryDependencies?: string[];
  files?: { path: string }[];
};
const project = process.cwd();
const registry: { items: Item[] } = JSON.parse(
  readFileSync("registry.json", "utf8"),
);
const items = new Map<string, Item>(
  registry.items.map((item) => [item.name, item]),
);

function stylesheet(css: Css): string {
  return Object.entries(css)
    .map(([name, value]) =>
      typeof value === "string"
        ? `${name}: ${value};`
        : `${name} { ${stylesheet(value)} }`,
    )
    .join("\n");
}

function dependencies(
  name: string,
  active = new Set<string>(),
  installed = new Set<string>(),
) {
  assert(!active.has(name), `Registry dependency cycle at ${name}`);
  if (installed.has(name)) {
    return installed;
  }
  const item = items.get(name);
  assert(item, `Missing registry item ${name}`);
  active.add(name);
  for (const url of item.registryDependencies ?? []) {
    dependencies(
      url
        .split("/")
        .at(-1)
        ?.replace(/\.json$/, "") ?? "",
      active,
      installed,
    );
  }
  active.delete(name);
  installed.add(name);
  return installed;
}

async function consumer(names: string[], source = false) {
  const directory = mkdtempSync(join(tmpdir(), "ui-styles-"));
  try {
    mkdirSync(join(directory, "node_modules"));
    for (const dependency of [
      "react",
      "react-dom",
      "@base-ui",
      "cn",
      "tailwindcss",
    ]) {
      symlinkSync(
        join(project, "node_modules", dependency),
        join(directory, "node_modules", dependency),
      );
    }
    if (source) {
      const installed = new Set(
        names.flatMap((name) => [...dependencies(name)]),
      );
      for (const name of installed) {
        for (const file of items.get(name)?.files ?? []) {
          writeFileSync(
            join(directory, file.path.split("/").at(-1) ?? ""),
            readFileSync(file.path),
          );
        }
      }
    } else {
      const destination = join(directory, "node_modules/@roprgm/ui");
      mkdirSync(destination, { recursive: true });
      const manifest: { files: string[] } = JSON.parse(
        readFileSync("package.json", "utf8"),
      );
      for (const file of ["package.json", ...manifest.files]) {
        cpSync(join(project, file), join(destination, file), {
          recursive: true,
        });
      }
    }
    writeFileSync(
      join(directory, "index.html"),
      '<script type="module" src="/main.tsx"></script>',
    );
    writeFileSync(
      join(directory, "main.tsx"),
      `${names.map((name) => `import * as ${name.replaceAll("-", "_")} from "${source ? "./" : "@roprgm/ui/"}${name}";`).join("\n")}\nimport "./app.css";\nwindow.components = [${names.map((name) => name.replaceAll("-", "_")).join(",")}];`,
    );
    const theme = source
      ? `@reference "./core.css";\n${stylesheet(items.get("theme")?.css ?? {})}`
      : '@import "@roprgm/ui/themes/default.css";';
    writeFileSync(
      join(directory, "app.css"),
      `@import "tailwindcss" source(none);\n${theme}\n@source inline("bg-primary text-muted");`,
    );
    const result = await build({
      root: directory,
      configFile: false,
      logLevel: "error",
      plugins: [tailwindcss()],
      build: { write: false, minify: false, cssMinify: false },
    });
    const bundles = Array.isArray(result) ? result : [result];
    const css = bundles
      .flatMap((bundle) => {
        assert("output" in bundle, "Expected a completed build, not a watcher");
        return bundle.output;
      })
      .filter((file) => file.type === "asset" && file.fileName.endsWith(".css"))
      .map((file) => (file.type === "asset" ? String(file.source) : ""))
      .join("\n");
    assert(css.includes(".button"));
    assert(
      css.includes(".bg-primary"),
      "Apps can use the registered token utilities",
    );
    assert(css.includes("background-color: var(--color-primary"));
    assert(
      !css.includes("@apply") &&
        !css.includes("@reference") &&
        !css.includes("@utility"),
    );
    assert(
      !css.includes(".slider"),
      "An unused Slider must not contribute styles",
    );
    const scrolling = names.includes("scroll-text");
    assert(!css.includes(".scroll-area"));
    assert.equal(css.includes(".scroll-text"), scrolling);
    assert.equal(
      [...css.matchAll(/@keyframes overflow-fade-x-start\b/g)].length,
      scrolling ? 1 : 0,
      "Scroll animations must only load once, with their consumers",
    );
    assert.equal(css.includes("@property --overflow-fade-start"), scrolling);
    assert.equal(
      [...css.matchAll(/--color-level-0\s*:/g)].length,
      1,
      "Shared token defaults must be included once",
    );
    assert.equal(css.includes(".select-trigger"), names.includes("select"));
    console.log(
      `${source ? "registry" : "npm"}: ${names.join(" + ")} (${Buffer.byteLength(css)} CSS bytes)`,
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

for (const item of items.values()) {
  dependencies(item.name);
}
for (const names of [
  ["button"],
  ["button", "select"],
  ["button", "scroll-text"],
]) {
  await consumer(names);
  await consumer(names, true);
}
console.log("Stylesheet modules and registry dependency graph verified.");
