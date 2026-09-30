import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { compile } from "@tailwindcss/node";
import { Features, transform } from "lightningcss";

/**
 * Compiles each component's CSS module into plain CSS in dist, beside the JavaScript that imports
 * it: `@apply` written out against the theme, whose tokens stay variables, and nesting flattened,
 * so an app's bundler reads it without Tailwind.
 */
const dir = resolve("src/components");

/**
 * Tailwind's CSS less its banner and its `*` fallback for browsers without `@property`, which
 * Tailwind doesn't support and a CSS module can't hold: its selectors need a class of their own.
 */
function tidy(css: string): string {
  const unbannered = css.replace(/^\/\*!.*\*\/\n/, "");
  const start = unbannered.indexOf("@layer properties {");
  if (start < 0) return unbannered;
  let end = unbannered.indexOf("{", start) + 1;
  for (let depth = 1; depth > 0; end++) {
    if (unbannered[end] === "{") depth++;
    if (unbannered[end] === "}") depth--;
  }
  return unbannered.slice(0, start) + unbannered.slice(end);
}

for (const file of readdirSync(dir).filter((name) => name.endsWith(".css"))) {
  const source = readFileSync(`${dir}/${file}`, "utf8");
  const compiler = await compile(source, { base: dir, onDependency() {} });
  const code = Buffer.from(tidy(compiler.build([])));
  const css = transform({ filename: file, code, include: Features.Nesting });
  writeFileSync(`dist/${file}`, css.code);
}
