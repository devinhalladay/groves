import '../public/style.scss'

import React from 'react'
import { AuthProvider } from '../context/auth-context'
import AppProviders from '../components/AppProviders'
import { UserProvider } from '../context/user-context'
import { SelectionProvider } from '../context/selection-context'

const GrovesClient = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  )
}

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

export default GrovesClient