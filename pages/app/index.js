import React, { useEffect } from 'react'
import { ServerResponse } from "http";
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth-context'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter, Router } from 'next/router'

export default (props) => {
  const router = useRouter()
  const auth = useAuth()
  const prevSession = auth.hasPreviousSession()

  if (props.isAuthenticated) {
    return (
      <Layout>
        <h1>Authenticated</h1>
      </Layout>
    )
  }

  return 'hello you are here'

  // if (!prevSession) {
  //   // if (ctx.req) {
  //   //   // If `ctx.req` is available it means we are on the server.
  //   //   ctx.res.writeHead(302, { Location: '/login' })
  //   //   ctx.res.end()
  //   // } else {
  //   //   // This should only happen on client.
  //   router.push('/')
  //   // }
  // } else {
  //   return (
  //     <Layout>
  //       <h1>Authenticated</h1>
  //     </Layout>
  //   )
  // }
}
// export default GrovesApp

export async function getServerSideProps(context) {
  if (!parseCookies(context)['access_token']) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()

    return {
      props: {isAuthenticated: false}, // will be passed to the page component as props
    }
  } else {
    return {
      props: {isAuthenticated: true}, // will be passed to the page component as props
    }
  }
}