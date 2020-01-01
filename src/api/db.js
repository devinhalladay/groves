const faunadb = require('faunadb');
/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_SECRET_KEY
})
export { q, client } 