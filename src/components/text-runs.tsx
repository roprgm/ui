import { Children, Fragment, type ReactNode } from "react";

const isText = (node: ReactNode) =>
  typeof node === "string" || typeof node === "number";

/** Children with each run of text, such as `Photos {count}`, drawn by `label` as one. */
export function textRuns(
  children: ReactNode,
  label: (text: string) => ReactNode,
) {
  const runs: ReactNode[] = [];
  for (const child of Children.toArray(children)) {
    const last = runs.length - 1;
    if (isText(child) && typeof runs[last] === "string") {
      runs[last] += String(child);
    } else {
      runs.push(isText(child) ? String(child) : child);
    }
  }
  return runs.map((run, index) =>
    typeof run === "string" ? (
      <Fragment key={index}>{label(run)}</Fragment>
    ) : (
      run
    ),
  );
}
