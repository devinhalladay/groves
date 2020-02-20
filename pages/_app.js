import { useEffect } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import '../public/style.scss'

function GrovesClient({ Component, pageProps }) {
  useEffect(() => {
    // if (!isReady) {
      if (parseCookies('arena_token')) {
        let Arena = new ArenaClient(cookies.get('arena_token'))
        Arena.setMe(Arena.getMe()).then((me) => {
          setUser({
            ...user,
            me
          })
  
        Arena.getChannelsForMe()
          .then(chans => {
            setChannels({
              ...channels,
              ...chans
            })
          })
        }).catch(e => cookies.remove('arena_token'))
  
        isIsReady(true)
      } else {
        // history.push('/orchard')
      }
    // }
  }, [])

  return <Component {...pageProps} />
}

export default GrovesClient