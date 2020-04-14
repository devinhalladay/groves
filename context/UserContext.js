import { createContext, useState, useContext, useEffect } from 'react';
import ArenaContext from './ArenaContext';

const UserContext = createContext();

const UserProvider = props => {
  const [user, setUser] = useState({})
  const [channels, setChannels] = useState([])

  const { arena } = useContext(ArenaContext)

  useEffect(() => {
    arena.setMe(arena.getMe())
      .then((me) => {
        setUser({ ...user, me })
      })
  }, [arena]);

  const { children } = props

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        channels,
        setChannels
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserConsumer = UserContext.Consumer

export default UserContext

export { UserProvider }