import { client, q } from './db'

const getUser = client.query(
  q.Paginate(
    q.Match(
      q.Ref('indexes/all_users')))
)
  .then((response) => {
    const userRefs = response.data
    // create new query out of todo refs. 
    // https://docs.fauna.com/fauna/current/api/fql/
    const getUserDataQuery = userRefs.map((ref) => {
      return q.Get(ref)
    })
    // query the refs
    return client.query(getUserDataQuery).then((data) => data)
  })
  .catch((error) => console.log('error', error.message))

export default getUser;