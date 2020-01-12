import axios from 'axios'

export default async (method, path, content) => {
  await axios.post(`https://cors-anywhere.herokuapp.com/https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}`
    ).then(res => {
      res.json(res)
      // history.push('/orchard')
    })
  }).catch(err => {
    console.error(err);
  })
}

// export default async (method, path, content) => {
//   await axios.post(`https://cors-anywhere.herokuapp.com/https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}`
//     ).then(res => {
//       const arenaClient = new ArenaClient(res.data.access_token);
//       setCookie('arena_token', token, { path: '/' })
//       return arenaClient.getMe()
//         .then(me => arenaClient.setMe(me))
//         .then(me => {
//         props.handleAuth('LOGIN', me)
//           console.log('cool')
//           arenaClient.getChannelsForMe().then(console.log)
//           history.push('/orchard')
//         })
//   }).catch(err => {
//     console.error(err);
//   })

//   // res.json({ name: 'John', email: 'john@example.com' })
// }

