import { useEffect, useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import ArenaClient from './arena-client';

import '../public/style.scss'

function GrovesClient({ Component, pageProps }) {
  const [user, setUser] = useState({
    isAuthenticated: typeof parseCookies()['arena_token'] !== 'undefined'
  })
  const [channels, setChannels] = useState([])
  const [isReady, isIsReady] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState({})
  let Arena = {}

  useEffect(() => {
    // if (!isReady) {
      if (parseCookies()['arena_token']) {
        Arena = new ArenaClient(parseCookies()['arena_token'])
        Arena.setMe(Arena.getMe()).then((me) => {
          setUser({
            ...user,
            me
          })
  
        Arena.getChannelsForMe()
          .then(chans => {
            console.log(chans);
            
            setChannels([
              ...channels,
              ...chans
            ])
          })
        }).catch(e => destroyCookie('arena_token'))
  
        // isIsReady(true)
      } else {
        console.log('test');
        
        // history.push('/orchard')
      }
    // }
  }, [])

  // console.log(channels);
  

  return (
    <Component 
      channels={channels} 
      selectedChannel={selectedChannel}
      setSelectedChannel={setSelectedChannel}
      user={user} 
      {...pageProps} />
  )
}

export default GrovesClient