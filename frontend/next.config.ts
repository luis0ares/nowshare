import type { NextConfig } from "next";
// this require import is required for rich markdown editor in next.js apps
// eslint-disable-next-line @typescript-eslint/no-require-imports
const removeImports = require("next-remove-imports")();

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
};

module.exports = removeImports(nextConfig);
