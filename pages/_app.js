import '../public/style.scss'

import React from 'react'
import AppProviders from '../components/AppProviders'

import { useUser } from '../context/user-context'

const GrovesClient = ({ Component, pageProps }) => {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  )
}

export default GrovesClient