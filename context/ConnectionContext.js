import { createContext, useState, useEffect, useContext } from 'react';
import ArenaContext from './ArenaContext';

const ConnectionContext = createContext();

const ConnectionProvider = props => {
  const [selectedChannel, setSelectedChannel] = useState([])
  const [channels, setChannels] = useState({})

  const { arena } = useContext(ArenaContext)

  arena.client.getChannelsForMe().then(chans => {
    setChannels([ ...channels, ...chans ])
  })

  const { children } = props

  return (
    <ConnectionContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export const ConnectionConsumer = ConnectionContext.Consumer

export default ConnectionContext

export { ConnectionProvider }