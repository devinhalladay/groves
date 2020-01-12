const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const code = req.body.code

  console.log(code);
  

  // res.json({auth_token: code})

  const auth_token = await axios.post(`https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${req.headers.origin}/api/auth-user`)

  console.log(auth_token);

  res.json({auth_token: auth_token})
}