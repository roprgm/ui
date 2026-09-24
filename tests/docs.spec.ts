import { expect, test } from "@playwright/test";

/**
 * Captures the usage guide and every demo on the docs site, so a refactor can prove it changes no
 * pixel. `bun run snapshots --update-snapshots` records them; `bun run snapshots` compares.
 */
test("docs", async ({ page }) => {
  await page.goto("/");
  await expect.soft(page).toHaveScreenshot("usage.png", { fullPage: true });

  const links = await page
    .locator("nav a[href^='#']")
    .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")));
  const captured = new Set<string | null>();
  for (const link of links) {
    await page.goto(`/${link}`);
    for (const article of await page.locator("main article").all()) {
      const name = await article.getAttribute("id");
      if (captured.has(name)) continue;
      captured.add(name);
      await expect.soft(article).toHaveScreenshot(`${name}.png`);
    }
  }
});
