import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import ArenaClient from '../utils/arena-client'
import { useRouter, Router } from 'next/router'
import { useMutation } from '@apollo/react-hooks';

const AuthContext = createContext()

const AuthProvider = (props) => {
  // if (weAreStillWaitingToGetTheUserData) {
  //   return 'loading'
  // }
  

  const router = useRouter()

  const [data, setData] = useState({
    token: parseCookies()['access_token'] ? parseCookies()['access_token'] : null,
    client: {},
  })

  const hasPreviousSession = () => {
    return data.token && window.localStorage.getItem('user')
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
        setData({
          ...data,
          token: res.access_token
        })
  
        setCookie(ctx, 'access_token', res.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          // Router.push('/app')
          // return res.access_token
        })
      }).then(() => {
        const client = new ArenaClient(parseCookies()['access_token'])
  
        setData({
          ...data,
          client: client
        })
  
        return client
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
    <AuthContext.Provider value={{data, user, login, logout, hasPreviousSession}} {...props} />
  )
}
 
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider, AuthContext }