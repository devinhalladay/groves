import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { parseCookies, setCookie } from 'nookies';

const axios = require('axios');

export default async (req, res) => {
  let { query } = await req.body

  query = JSON.parse(JSON.stringify(query))
  
  const authURL = `https://api.are.na/graphql`
  
  try {
    await axios.post(authURL, {
      query
    }, {
      headers: {
        ...req.headers['authorization'],
        "X-APP-TOKEN": process.env.GRAPHQL_TOKEN,
      }
    }).then(response => {
      res.status(response.status).json(response.data)
    })
  } catch (error) {
    return error
    res.status(400).json({ message: error })
  }
}