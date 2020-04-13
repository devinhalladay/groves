import { useEffect, useState, useContext } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import UserContext, { UserProvider } from '../context/UserContext'

import { withAuthSync } from '../utils/auth'

import '../public/style.scss'

function GrovesClient({ Component, pageProps }) {
  const [isReady, setIsReady] = useState(false)
  

  return (
    <UserProvider>
      <Component
        // channels={channels} 
        // user={user}
        // me={user.me}
        // setIsReady={setIsReady}
        // isReady={isReady}
        {...pageProps} />
    </UserProvider>
  )
}

export default GrovesClient