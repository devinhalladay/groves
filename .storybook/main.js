const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    'storybook-addon-apollo-client',
  ],
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
    ];
    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
