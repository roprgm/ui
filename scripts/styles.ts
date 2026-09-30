import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { compile, optimize } from "@tailwindcss/node";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

// Keep stylesheet modules separate so component imports retain their dependency graph.
const styles = new Set<string>();
for (const file of readdirSync("src/components").sort()) {
  if (!file.endsWith(".tsx")) {
    continue;
  }
  const source = readFileSync(join("src/components", file), "utf8");
  for (const [, style] of source.matchAll(/import "\.\/([^"\n]+\.css)"/g)) {
    styles.add(style);
  }
}
for (const file of styles) {
  const source = join("src/components", file);
  const compiler = await compile(readFileSync(source, "utf8"), {
    base: resolve(dirname(source)),
    onDependency() {},
  });
  const css = optimize(compiler.build([]), { minify: false }).code;
  writeFileSync(join("dist", file), css);
}
