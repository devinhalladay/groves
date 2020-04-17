// import { useEffect, useState, useContext } from 'react'
// import { parseCookies, setCookie, destroyCookie } from 'nookies'

// import UserContext, { UserProvider } from '../context/UserContext'

import '../public/style.scss'

// import ArenaContext, { ArenaProvider } from '../context/ArenaContext'

// function GrovesClient({ Component, pageProps, isAuthenticated }) {
//   if (isAuthenticated) {
//     return (
//       <ArenaProvider>
//         <UserProvider>
//           <Component
//             {...pageProps} />
//         </UserProvider>
//       </ArenaProvider>
//     )
//   } else {
//     return (
//       <Component
//         {...pageProps} />
//     )
//   }
// }

// export async function getServerSideProps() {
//   const { arena } = useContext(ArenaContext)

//   return {
//     props: { isAuthenticated: typeof arena.accessToken !== 'undefined' }
//   }
// }

// export default GrovesClient

import React from 'react'
import AppProviders from '../components/AppProviders'
// import Root from '.'

import { useUser } from '../context/user-context'
// import UnauthenticatedApp from './UnauthenticatedApp'
// import AuthenticatedApp from './AuthenticatedApp'

const GrovesClient = ({ Component, pageProps }) => {
  // const { Component } = props
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  )
}

export default GrovesClient