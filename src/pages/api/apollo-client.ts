const axios = require('axios');

export default async (req, res) => {
  let { query } = await req.body;
  const { authorization } = req.headers;

  query = JSON.parse(JSON.stringify(query));

  const authURL = `https://api.are.na/graphql`;

  try {
    const result = await axios.post(
      authURL,
      {
        ...req.body,
      },
      {
        headers: {
          Authorization: authorization,
          'X-APP-TOKEN': process.env.GRAPHQL_TOKEN,
        },
      },
    );

    return res.status(200).json(result.data);
  } catch (err) {
    res.status(500);
  }

  return res.status(401).json({ message: 'not logged in' });
};
