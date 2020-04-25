import '../public/style.scss'

import React from 'react'
import { AuthProvider } from '../context/auth-context'
import AppProviders from '../components/AppProviders'
import { UserProvider } from '../context/user-context'
import { SelectionProvider } from '../context/selection-context'
import { parseCookies } from 'nookies'
import { Router } from 'next/router'

const GrovesClient = ({ Component, pageProps, isAuthenticated }) => {
  if (isAuthenticated) {
    console.log('AUTHENTICATED');
    
    return (
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    )
  }

  console.log('NOT AUTHENTICATED');

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

GrovesClient.getInitialProps = ({ ctx }) => {
  if (parseCookies(ctx)['access_token']) {
    return { isAuthenticated: true };
  }

  return { isAuthenticated: false }
}

export default GrovesClient