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
      console.log(response.status);
      console.log(response.data.data);
      res.status(response.status).json(response.data)
    })
  } catch (error) {
    console.log(error);
    return error
    res.status(400).json({ message: error })
      // ? res.status(response.status).json({ message: response.statusText })
  }
}

// export default async (req, res) => {
//   console.log(req.headers['authorization']);
//   // console.log(process.env.GRAPHQL_TOKEN);

//   const client = new ApolloClient({
//     ssrMode: true,
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: 'https://api.are.na/graphql',
//       headers: {
//         "authorization": `${req.headers['authorization']}`,
//         "X-APP-TOKEN": process.env.GRAPHQL_TOKEN,
//       }
//     })
//   });
  
//   try {
//     client
//       .query({
//         query: gql`
//           ${req.body.query}
//         `
//       })
//       .then(result => {
//         return new Promise(resolve => {
//           res.status(200).json(result);
//           return resolve();
//         });
//       })
//       .catch(error => {
//         return new Promise(reject => {
//           res.status(400).json({error});
//           return reject();
//         });
//         console.log(error);
//         return res.status(400).json({ message: error.message })
//       })
//   } catch (error) {
//     const { response } = error
//     return response
//       ? res.status(response.status).json({ message: response.statusText })
//       : res.status(400).json({ message: error.message })
//   }
// }