const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // 'storybook-addon-next',
    // '@storybook/preset-typescript',
    '@storybook/preset-scss',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
  ],
  // presets: ['@storybook/preset-scss'],
  // module: {
  //   rules: [
  //     {
  //       test: /\.scss$/,
  //       exclude: /node_modules(?!\/@storybook\/addon-info)/,
  //       loaders: ['style-loader', 'css-loader', 'sass-loader'],
  //       include: path.resolve(__dirname, '../'),
  //     },
  //     { test: /\.css$/, loader: 'style-loader!css-loader', include: __dirname },
  //   ],
  // },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
