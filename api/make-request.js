const axios = require('axios');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const code = req.header

  res.json({auth_token: code})
}