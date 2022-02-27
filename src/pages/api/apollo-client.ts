import { getSession } from "next-auth/react";

const axios = require('axios');

export default async (req, res) => {
  let { query } = await req.body;

  query = JSON.parse(JSON.stringify(query));

  const authURL = `https://api.are.na/graphql`;

  const session = await getSession({ req })

  console.log('NEW SESSION', session);

  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))

    try {
      await axios
        .post(
          authURL,
          {
            ...req.body,
          },
          {
            headers: {
              authorization: `Bearer ${session.accessToken}`,
              'X-APP-TOKEN': process.env.GRAPHQL_TOKEN,
            },
          },
        )
        .then((response) => {
          return res.status(response.status).json(response.data);
        });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  } else {
    // Not Signed in
    res.status(401)
  }


};
