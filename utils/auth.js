import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import ArenaClient from '../utils/arena-client';


export const auth = ctx => {
  const { token } = parseCookies()['arena_token']

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  if (!token) {
    Router.push('/login')
  }

  return token
}