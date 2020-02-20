const axios = require('axios');

export default async (req, res) => {
  
  if (req.body) {
    console.log(req.body.access_code);
    const token = await axios.post(`https://dev.are.na/oauth/token?client_id=${process.env.APPLICATION_ID}&client_secret=${process.env.APPLICATION_SECRET}&code=${req.body.access_code}&grant_type=authorization_code&redirect_uri=${process.env.APPLICATION_CALLBACK}`).then((response) => {
        return ({ auth_token: response.data.access_token })
      })
    
    return res.json(JSON.stringify(token))
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.send(`no code included`)
  }
}