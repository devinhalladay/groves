import React from 'react'
import { ArenaProvider } from "../context/ArenaContext"
import { UserProvider } from "../context/user-context"
import { AuthProvider } from '../context/auth-context'

const AppProviders = ({children}) => {
  return (
    <AuthProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthProvider>
  )
}

export default AppProviders