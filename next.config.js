
console.log({
  APP_ID: process.env.APP_ID,
  APP_SECRET: process.env.APP_SECRET,
  LOCAL_CALLBACK: process.env.LOCAL_CALLBACK,
  NODE_ENV: process.env.NODE_ENV
});

module.exports = {
  target: "serverless",
  env: {
    // DEMO_KEY: process.env.DEMO_KEY,
    APP_ID: process.env.APP_ID,
    APP_SECRET: process.env.APP_SECRET,
    LOCAL_CALLBACK: process.env.NODE_ENV === 'production' ? process.env.LOCAL_CALLBACK : "http://localhost:3000/login",
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  }
};
