import { useEffect, useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import ArenaClient from '../utils/arena-client';

import '../public/style.scss'

function GrovesClient({ Component, pageProps }) {
  const [user, setUser] = useState({})
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    typeof parseCookies()['arena_token'] !== 'undefined' &&
      user.me !== undefined
  )
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
        }).then(() => setIsUserAuthenticated(true))
          .catch(e => destroyCookie('arena_token'))
      } else {
        console.log('not logged in');
      }
  })

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
  

  return (
    <Component
      channels={channels} 
      selectedChannel={selectedChannel}
      isUserAuthenticated={isUserAuthenticated}
      setSelectedChannel={setSelectedChannel}
      user={user}
      me={user.me}
      setIsReady={setIsReady}
      isReady={isReady}
      {...pageProps} />
  )
}

export default GrovesClient