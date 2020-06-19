import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { parseCookies, setCookie } from 'nookies';

const axios = require('axios');

export default async (req, res) => {
  let { query } = await req.body

  query = JSON.parse(JSON.stringify(query))
  
  const authURL = `https://api.are.na/graphql`

  console.log(req.headers['authorization']);
  console.log(process.env.GRAPHQL_TOKEN);
  
  try {
    await axios.post(authURL, {
      query
    }, {
      headers: {
        ...req.headers['authorization'],
        "X-APP-TOKEN": process.env.GRAPHQL_TOKEN,
      }
    }).then(response => {
      console.log(response.data);
      
      res.status(response.status).json(response.data)
    })
  } catch (error) {
    console.log(error);
    
    return error
    res.status(400).json({ message: error })
  }
}