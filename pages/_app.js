import { useEffect, useState, useContext } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import UserContext, { UserProvider } from '../context/UserContext'

import '../public/style.scss'

import { ArenaProvider } from '../context/ArenaContext'

function GrovesClient({ Component, pageProps }) {
  const [isReady, setIsReady] = useState(false)

  return (
    <ArenaProvider>
      <UserProvider>
        <Component
          {...pageProps} />
      </UserProvider>
    </ArenaProvider>
  )
}

export default GrovesClient