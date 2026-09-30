import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import postcss, { type Container } from "postcss";
import type { Registry } from "shadcn/schema";

type Rules = { [key: string]: string | Rules };

function rules(container: Container): Rules {
  const result: Rules = {};
  for (const node of container.nodes ?? []) {
    if (node.type === "decl") {
      result[node.prop] = node.value;
    }
    if (node.type === "rule") {
      result[node.selector] = rules(node);
    }
    if (node.type === "atrule" && node.nodes) {
      result[`@${node.name} ${node.params}`] = rules(node);
    }
  }
  return result;
}

const url = (name: string) => `https://ui.roprgm.com/r/${name}.json`;
const folder = "src/components";
const styles = readdirSync(folder)
  .filter((file) => file.endsWith(".css"))
  .sort();
const shared = styles.filter(
  (file) => !existsSync(join(folder, file.replace(/\.css$/, ".tsx"))),
);
const registry: Registry = JSON.parse(readFileSync("registry.json", "utf8"));
const sharedNames = new Set(shared.map((file) => basename(file, ".css")));
registry.items = registry.items.filter((item) => !sharedNames.has(item.name));

for (const file of shared) {
  registry.items.push({
    name: basename(file, ".css"),
    type: "registry:ui",
    files: [{ path: join(folder, file), type: "registry:ui" }],
  });
}

for (const item of registry.items) {
  if (item.name === "theme") {
    delete item.cssVars;
    item.css = {
      ...rules(postcss.parse(readFileSync("src/themes/default.css", "utf8"))),
      ...rules(postcss.parse(readFileSync(join(folder, "page.css"), "utf8"))),
    };
    item.registryDependencies = [url("tailwind")];
    item.docs =
      "Components include their own styles. To use the library tokens in your app’s Tailwind classes, add @reference to the installed ui/tailwind.css from your main CSS file (the relative path depends on your components.json aliases).";
    continue;
  }
  const ownStyle = join(folder, `${item.name}.css`);
  item.files = (item.files ?? []).filter((file) => file.path !== ownStyle);
  if (existsSync(ownStyle)) {
    item.files.push({ path: ownStyle, type: "registry:ui" });
  }
  // CSS dependencies are generated; component dependencies remain explicit registry metadata.
  const dependencies = new Set(
    (item.registryDependencies ?? []).filter(
      (dependency) =>
        !shared.some((file) => url(basename(file, ".css")) === dependency),
    ),
  );
  for (const file of item.files) {
    const source = readFileSync(file.path, "utf8");
    const imports = source.matchAll(
      /(?:import\s*|@(?:import|reference)\s*)["']\.\/([\w-]+)\.css["']/g,
    );
    for (const [, name] of imports) {
      if (name !== item.name) {
        dependencies.add(url(name));
      }
    }
  }
  item.registryDependencies = [...dependencies];
}
writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
