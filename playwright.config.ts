import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  snapshotPathTemplate: "tests/snapshots/{arg}{ext}",
  use: { baseURL: "http://localhost:5173" },
  webServer: {
    command: "bun run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
