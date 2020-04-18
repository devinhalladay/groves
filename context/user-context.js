// import { createContext, useState, useContext, useEffect } from 'react';
// import ArenaContext from './ArenaContext';

// const UserContext = createContext();

// const UserProvider = props => {
//   const [user, setUser] = useState({})
//   const [channels, setChannels] = useState([])

//   const { arena } = useContext(ArenaContext)

//   useEffect(() => {
//     arena.setMe(arena.getMe())
//       .then((me) => {
//         setUser({ ...user, me })
//       })
//   }, [arena]);

//   const { children } = props

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         channels,
//         setChannels
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   )
// }

// export const UserConsumer = UserContext.Consumer

// export default UserContext

// export { UserProvider }

import React, { useContext, createContext, useState, Children } from 'react'
import { AuthContext, useAuth } from './auth-context'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import ArenaClient from '../utils/arena-client'

const UserContext = createContext()

export const UserProvider = (props) => {
  const Arena = new ArenaClient()
  const [user, setUser] = useState({})
  const [channels, setChannels] = useState({ channels: props.channels })

  const { 
    data: {
      client
    } 
  } = useAuth()

  const getUserChannels = () => {
    Arena.setMe(Arena.getMe())
      .then((me) => {
        Arena.getChannelsForMe()
          .then(chans => {
            return chans
          })
      })
  }
  
  // console.log(props);
  

  // if (props.children.isAuthenticated) {
  //   // channels = UserProvider.getUserChannels()
  //   console.log('chans'); 
  //   // setChannels(channels)
  // }

  return (
    <UserContext.Provider value={{user, getUserChannels, channels}} {...props} />
  )
}

// export async function getServerSideProps(context) {
//   if (parseCookies(context)['access_token']) {
//     context.res.writeHead(302, { Location: '/app' })
//     context.res.end()

//     return {
//       props: {isAuthenticated: true}, // will be passed to the page component as props
//     }
//   } else {
//     return {
//       props: {isAuthenticated: false}, // will be passed to the page component as props
//     }
//   }
// }

export const useUser = () => useContext(UserContext)