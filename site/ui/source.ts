import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** A file of the repository, read as the page builds. */
export const readSource = (path: string) =>
  readFile(join(process.cwd(), path), "utf8");
