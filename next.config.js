// @ts-check

const { patchWebpackConfig } = require('next-global-css');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  env: {
    APPLICATION_ID: process.env.APPLICATION_ID,
    APPLICATION_SECRET: process.env.APPLICATION_SECRET,
    APPLICATION_CALLBACK: process.env.APPLICATION_CALLBACK,
    APPLICATION_API_CALLBACK: process.env.APPLICATION_API_CALLBACK,
    APPLICATION_API_PATH: process.env.APPLICATION_API_PATH,
    SERVER_AUTH_CALLBACK: process.env.SERVER_AUTH_CALLBACK,
    GRAPHQL_TOKEN: process.env.GRAPHQL_TOKEN,
    AUTHENTICATION_ENABLED:
      process.env.NODE_ENV === 'production' ? false : true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  webpack(config, options) {
    patchWebpackConfig(config, options);

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            titleProp: true,
            // dimensions: false,
            svgo: false,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        // options.defaultLoaders.babel, I don't think it's necessary to have this loader too
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });

    return config;
  },
};
