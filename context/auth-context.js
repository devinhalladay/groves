import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import ArenaClient from '../utils/arena-client'
import { useRouter, Router } from 'next/router'

const AuthContext = createContext()

const AuthProvider = (props) => {
  const router = useRouter()

  const [accessToken, setAccessToken] = useState(parseCookies()['access_token'] ? parseCookies()['access_token'] : null)
  const [client, setClient] = useState(null)

  const hasPreviousSession = () => {
    return accessToken && window.localStorage.getItem('user')
  }

  const [user, setUser] = useState(
    hasPreviousSession() ?
    JSON.parse(window.localStorage.getItem('user')) :
    null
  )

  const login = async ({ctx, code}) => {
      const res = await fetch(`${process.env.APPLICATION_API_CALLBACK}/${process.env.APPLICATION_API_PATH}/auth-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ auth_code: code })
      });
  
      res.json().then((res) => {
        setAccessToken(res.access_token)
  
        setCookie(ctx, 'access_token', res.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          // Router.push('/app')
          // return res.access_token
        })
      }).then(() => {
        const arenaClient = new ArenaClient(parseCookies()['access_token'])
  
        setClient(arenaClient)
  
        return arenaClient
      }).then((client) => {
        client.setMe(client.getMe())
          .then((me) => {
            window.localStorage.setItem('user', JSON.stringify(me));
            setUser({ ...me })
          })
      }).then(() => {
        router.push('/app')
      })
  }

  const logout = (ctx) => {
    destroyCookie(ctx, 'access_token', {
      path: '/'
    })
  
    // to support logging out from all windows
    // window.localStorage.setItem('logout', Date.now())

    window.localStorage.removeItem('user')

    setUser(null)

    router.push('/')
  }

  return (
    <AuthContext.Provider value={{accessToken, user, login, logout, hasPreviousSession}} {...props} />
  )
}
 
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider, AuthContext }