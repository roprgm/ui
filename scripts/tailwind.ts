import { readFileSync, writeFileSync } from "node:fs";
import postcss from "postcss";

// Register runtime tokens without emitting a second set of defaults in each stylesheet.
const variables: string[] = [];
postcss
  .parse(readFileSync("src/components/tokens.css", "utf8"))
  .walkDecls(({ prop }) => {
    if (/^--(?:color|font|radius|spacing)-/.test(prop)) {
      variables.push(`  ${prop}: var(${prop});`);
    }
  });
writeFileSync(
  "src/components/tailwind.css",
  `/* Generated from tokens.css by scripts/tailwind.ts. */\n@reference "tailwindcss";\n\n@theme reference {\n${variables.join("\n")}\n}\n`,
);
