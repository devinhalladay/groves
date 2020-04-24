import React from 'react'
import { UserProvider } from "../context/user-context"
import { AuthProvider, useAuth } from '../context/auth-context'
import { SelectionProvider } from '../context/selection-context'

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
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default AppProviders