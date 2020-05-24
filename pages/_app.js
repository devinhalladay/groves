import '../public/style.scss'

import React from 'react'
import { AuthProvider } from '../context/auth-context'
import { UserProvider } from '../context/user-context'
import { SelectionProvider } from '../context/selection-context'
import { parseCookies } from 'nookies'
import { Router } from 'next/router'
import Head from 'next/head'

const GrovesClient = ({ Component, pageProps, isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    )
  }

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  )
}

GrovesClient.getInitialProps = ({ ctx }) => {
  if (parseCookies(ctx)['access_token']) {
    return { isAuthenticated: true };
  }

  return { isAuthenticated: false }
}

export default GrovesClient