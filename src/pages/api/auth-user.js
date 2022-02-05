const axios = require('axios');

export default async (req, res) => {
  const { auth_code } = await req.body;

  const authURL = `https://dev.are.na/oauth/token?client_id=${process.env.APPLICATION_ID}&client_secret=${process.env.APPLICATION_SECRET}&code=${auth_code}&grant_type=authorization_code&redirect_uri=${process.env.APPLICATION_CALLBACK}`;

  try {
    const response = await axios.post(authURL);
    let { access_token } = response.data;

    if (!access_token) {
      access_token = null;
    }

    return res.status(200).json({ access_token: access_token });
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response) {
      return res.status(response.status).send({ message: response.statusText });
    }
    res.status(400).json({ message: error.message });
  }
};
