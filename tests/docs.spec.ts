import { expect, test } from "@playwright/test";

/**
 * Captures the usage guide and every demo on the docs site, with its popups open, so a refactor
 * can prove it changes no pixel. `bun run snapshots --update-snapshots` records them;
 * `bun run snapshots` compares.
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

      const triggers = await article.locator("[aria-haspopup]").all();
      for (const [index, trigger] of triggers.entries()) {
        await trigger.click();
        await expect.soft(page).toHaveScreenshot(`${name}-${index + 1}.png`);
        await page.keyboard.press("Escape");
      }
    }
  }

  // Tooltips open on hover, and their triggers carry no attribute to find them by.
  await page.goto("/#tooltip");
  await page.getByRole("button", { name: "top", exact: true }).hover();
  await page.getByText("Saves the document").waitFor();
  await expect.soft(page).toHaveScreenshot("tooltip-open.png");
});
