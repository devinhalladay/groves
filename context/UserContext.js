import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = props => {
  const [user, setUser] = useState({})
  const [channels, setChannels] = useState([])

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