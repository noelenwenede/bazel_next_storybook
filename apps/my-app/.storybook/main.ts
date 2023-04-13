import { dirname } from "path";

import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
    },
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: {}
    }
  },
  webpackFinal: async (config) => {
    console.log(dirname(require.resolve("react")));
    const fallback = {
      assert: require.resolve('assert'),
      path: require.resolve('path-browserify'),
      sys: require.resolve('util'),
      util: require.resolve('util'),
    };
    (config.resolve as any).fallback = {
      ...config.resolve?.fallback,
      ...fallback
    };
    (config.resolve as any).alias = {
      ...config.resolve?.alias,
      // This is done this way to ensure imports to files 
      // in the package folder can be done. For example import react/jsx-runtime
      // fails when the resolution using just require.resolve("react") will return 
      // ...react/index.js which is not the correct path. for files inside the package 
      // like react/jsx-runtime which then resolves to ...react/index.js/jsx-runtime. 
      // Remember this will only work for packages that have and index.js file in the root.
      // react:require.resolve("react"),
      react: dirname(require.resolve("react")),
      // "react/jsx-runtime": `${dirname(require.resolve("react"))}/jsx-runtime`,
      // Dependencies below are peerDependencies of @storybook/nextjs
      // Had to lift them up so that they are resolved correctly.
      "postcss-loader": require.resolve('postcss-loader'),
      "css-loader": require.resolve('css-loader'),
    };
    return config;
  }
};
export default config;
