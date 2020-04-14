import { createContext, useState, useEffect } from 'react';
import ArenaClient from '../utils/arena-client';
import { parseCookies } from 'nookies';

const ArenaContext = createContext({ authenticated: false });

const ArenaProvider = props => {
  let [token, setToken] = useState()

  useEffect(() => {
    setToken(parseCookies()['access_token'])
  }, [parseCookies()['access_token']])
  
  const [arena, setArena] = useState(new ArenaClient(parseCookies()['access_token']))

  const { children } = props

  return (
    <ArenaContext.Provider
      value={{arena}}
    >
      {children}
    </ArenaContext.Provider>
  )
}

export const ArenaConsumer = ArenaContext.Consumer

export default ArenaContext

export { ArenaProvider }