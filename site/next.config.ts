import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const config: NextConfig = {
  // Every page is built ahead as HTML and the payload client navigation reads; nothing runs on a server.
  output: "export",
  // The site imports the library from the repository around it.
  turbopack: { root: `${import.meta.dirname}/..` },
  agentRules: false,
  devIndicators: false,
  experimental: {
    // Prefetched pages stay fresh for a day, so navigation never waits on the network.
    staleTimes: { static: 86400 },
  },
};

export default createMDX()(config);
