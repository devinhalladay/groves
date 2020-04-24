import '../public/style.scss'

import React from 'react'
import { AuthProvider } from '../context/auth-context'
import AppProviders from '../components/AppProviders'

const GrovesClient = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <AppProviders>
        <Component {...pageProps} />
      </AppProviders>
    </AuthProvider>
  )
}

export default GrovesClient