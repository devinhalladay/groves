const axios = require('axios');

export default async (req, res) => {
  if (req.body) {
    const token = await axios.get(`http://api.are.na/v2/users/${req.body.user_id}/following`).then((response) => {
      console.log(response);
      
        return response
      })
    
    return res.json(token)
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.send(`no code included`)
  }
}