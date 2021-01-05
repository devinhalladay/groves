const https = require('https');
const { parse } = require('url');
const next = require('next');
const dotenv = require('dotenv').config();
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Load local SSL certificates for development
const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/certificate.pem')
};

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(8000, (err) => {
      if (err) throw err;
      console.log('> Ready on https://localhost:8000');
    });
});
