import React from 'react'
import { UserProvider } from "../context/user-context"
import { AuthProvider, useAuth } from '../context/auth-context'
import { SelectionProvider } from '../context/selection-context'
import { parseCookies } from 'nookies'

const AppProviders = ({children}) => {
  const { hasPreviousSession } = useAuth()

  if (hasPreviousSession) {
    return (
      <UserProvider>
        <SelectionProvider>
          {children}
        </SelectionProvider>
      </UserProvider>
    ) 
  } else {
    return children
  }
}



export default AppProviders