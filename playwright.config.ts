import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  snapshotPathTemplate: "tests/snapshots/{arg}{ext}",
  // One test walks every demo and opens every popup, which outlasts the default 30s.
  timeout: 180_000,
  // Any change of color counts, however slight, so a subtle shadow can't slip through.
  expect: { toHaveScreenshot: { threshold: 0 } },
  // Its own port, so the test never screenshots another app's dev server.
  use: { baseURL: "http://localhost:5199" },
  webServer: {
    command: "bun run dev --port 5199 --strictPort",
    url: "http://localhost:5199",
    reuseExistingServer: true,
  },
});
