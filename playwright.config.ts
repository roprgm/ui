import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  snapshotPathTemplate: "tests/snapshots/{arg}{ext}",
  // Any change of color counts, however slight, so a subtle shadow can't slip through.
  expect: { toHaveScreenshot: { threshold: 0 } },
  use: { baseURL: "http://localhost:5173" },
  webServer: {
    command: "bun run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
