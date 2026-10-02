import { CodeBlock } from "@roprgm/ui/code-block";
import type { ComponentProps } from "react";
import { parse, render } from "sugar-high/core";
import * as css from "sugar-high/lang/css";
import * as shell from "sugar-high/lang/shell";
import * as typescript from "sugar-high/lang/typescript";

const languages = { css, shell, tsx: typescript };

type Language = keyof typeof languages;

export const isLanguage = (lang: string): lang is Language => lang in languages;

const highlight = (code: string, lang: Language = "tsx") =>
  render(parse(code, languages[lang]));

/** Code highlighted as the page builds, with a copy button. */
export function Code({
  children,
  lang = "shell",
  ...props
}: Omit<ComponentProps<typeof CodeBlock>, "code" | "html"> & {
  children: string;
  lang?: Language;
}) {
  return (
    <CodeBlock code={children} html={highlight(children, lang)} {...props} />
  );
}
