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
      options: { }
    }
  },
  webpackFinal: async (config) => {
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
      // To work with mdx stories
      // We need to find a way to resolve react/jsx-runtime correctly.
      react: require.resolve('react'),
      // Dependencies below are peerDependencies of @storybook/nextjs
      // Had to lift them up so that they are resolved correctly.
      "postcss-loader": require.resolve('postcss-loader'),
      "css-loader": require.resolve('css-loader'),
    };
    return config;
  }
};
export default config;
