const axios = require('axios');

export default async (req, res) => {
  let { query, variables } = await req.body;

  query = JSON.parse(JSON.stringify(query));

  const authURL = `https://api.are.na/graphql`;

  try {
    await axios
      .post(
        authURL,
        {
          ...req.body
        },
        {
          headers: {
            authorization: `${req.headers['authorization']}`,
            'X-APP-TOKEN': process.env.GRAPHQL_TOKEN
          }
        }
      )
      .then((response) => {
        res.status(response.status).send(response.data);
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
    return error;
  }
};
