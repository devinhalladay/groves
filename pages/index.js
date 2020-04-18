import React, { useEffect } from 'react'
import { useUser } from '../context/user-context'
import Header from '../components/Header'
import { Router, useRouter } from 'next/router'
import { useAuth } from '../context/auth-context'
import { parseCookies } from 'nookies'

const Root = (props) => {
  const router = useRouter()
  const auth = useAuth()

  return <Header />
}

export async function getServerSideProps(context) {
  if (parseCookies(context)['access_token']) {
    context.res.writeHead(302, { Location: '/app' })
    context.res.end()

    return {
      props: {isAuthenticated: true}
    }
  } else {
    return {
      props: {isAuthenticated: false}
    }
  }
}

export default Root
