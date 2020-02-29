import { useEffect, useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import ArenaClient from '../utils/arena-client';

import '../public/style.scss'

function GrovesClient({ Component, pageProps }) {
  const [user, setUser] = useState({
    isAuthenticated: typeof parseCookies()['arena_token'] !== 'undefined'
  })
  const [channels, setChannels] = useState([])
  const [isReady, setIsReady] = useState(false)
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
            setChannels([
              ...channels,
              ...chans
            ])
          })
        }).catch(e => destroyCookie('arena_token'))
      } else {
        console.log('test');
        
        // history.push('/orchard')
      }
    // }
  }, [])

  useEffect(() => {
    if (parseCookies()['arena_token'] && selectedChannel.id) {
      Arena = new ArenaClient(parseCookies()['arena_token'])
      Arena.getBlocksFromChannel(selectedChannel.id, selectedChannel.length).then(blocks => {
        setSelectedChannel({ ...selectedChannel, contents: [...blocks] })
      }).then(() => {
        setIsReady(true);
      })
    }
  }, [selectedChannel.id])

  // console.log(channels);
  

  return (
    <Component 
      channels={channels} 
      selectedChannel={selectedChannel}
      setSelectedChannel={setSelectedChannel}
      user={user}
      setIsReady={setIsReady}
      isReady={isReady}
      {...pageProps} />
  )
}

export default GrovesClient