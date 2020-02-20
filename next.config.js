const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    APPLICATION_ID: process.env.APPLICATION_ID,
    APPLICATION_SECRET: process.env.APPLICATION_SECRET,
    APPLICATION_CALLBACK: process.env.APPLICATION_CALLBACK,
    APPLICATION_API_CALLBACK: process.env.APPLICATION_API_CALLBACK,
    APPLICATION_API_PATH: process.env.APPLICATION_API_PATH,
    SERVER_AUTH_CALLBACK: process.env.SERVER_AUTH_CALLBACK
  },
})