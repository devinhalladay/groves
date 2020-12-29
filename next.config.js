const withYaml = require('next-plugin-yaml');

module.exports = withYaml({
  env: {
    APPLICATION_ID: process.env.APPLICATION_ID,
    APPLICATION_SECRET: process.env.APPLICATION_SECRET,
    APPLICATION_CALLBACK: process.env.APPLICATION_CALLBACK,
    APPLICATION_API_CALLBACK: process.env.APPLICATION_API_CALLBACK,
    APPLICATION_API_PATH: process.env.APPLICATION_API_PATH,
    SERVER_AUTH_CALLBACK: process.env.SERVER_AUTH_CALLBACK,
    GRAPHQL_TOKEN: process.env.GRAPHQL_TOKEN,
    AUTHENTICATION_ENABLED: process.env.NODE_ENV === 'production' ? false : true
  }

  // webpack: function (config) {
  //   config.module.rules.push({
  //     test: /\.ya?ml$/,
  //     use: 'js-yaml-loader'
  //   });
  //   return config;
  // }
});
