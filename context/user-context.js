import React, { useContext, createContext, useState, Children } from 'react'
import { AuthContext, useAuth } from './auth-context'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import ArenaClient from '../utils/arena-client'

const UserContext = createContext()

export const UserProvider = (props) => {
  const Arena = new ArenaClient()
  const [user, setUser] = useState({})
  const [channels, setChannels] = useState({ channels: props.channels })

  const { 
    data: {
      client
    } 
  } = useAuth()

  const getUserChannels = () => {
    Arena.setMe(Arena.getMe())
      .then((me) => {
        Arena.getChannelsForMe()
          .then(chans => {
            return chans
          })
      })
  }

  return (
    <UserContext.Provider value={{user, getUserChannels, channels}} {...props} />
  )
}

export const useUser = () => useContext(UserContext)