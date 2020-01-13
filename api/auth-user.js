const axios = require('axios');

module.exports = (req, res) => {
  // bootleg
  if (req.body) {
    const code = req.body.code
    let toke = axios.post(`https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.SERVER_AUTH_CALLBACK}`).then((response) => {
      return res.send({auth_token: response.data.access_token})
    })
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.send({})
  }
}