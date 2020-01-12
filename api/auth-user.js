const axios = require('axios');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const code = req.body.code  

  res.json({authToken: code})

  axios.post(`https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${req.headers.origin}/api/auth-user`
    ).then(res => {
      res.json({authToken: res.auth_token})
    })
}