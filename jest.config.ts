import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom", // or 'node', depending on your environment
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ESM
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true, // Essential for handling ES modules
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(d3-geo|d3-selection|d3-scale|d3-shape|d3-array)/)", // Add any other D3 modules if necessary
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
