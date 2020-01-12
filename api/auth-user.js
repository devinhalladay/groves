const axios = require('axios');

module.exports = async (req, res) => {
  // bootleg
  if (req.body) {  
    const code = req.body.code
    return res.send({auth_token: code})
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.send({})
  }
}