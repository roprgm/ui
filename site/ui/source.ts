import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** A file of the repository, read as the page builds. */
export const readSource = (path: string) =>
  readFile(join(process.cwd(), path), "utf8");

/** What a component's file exports, as its import names them. */
export async function exportsOf(name: string) {
  const source = await readSource(`src/components/${name}.tsx`);
  return [...source.matchAll(/^export (?:function|const) (\w+)/gm)]
    .map((match) => match[1])
    .join(", ");
}
