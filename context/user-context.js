import React, { useContext, createContext, useState, Children, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useAuth } from './auth-context';
import withApollo from '../lib/withApollo';
import { SelectionProvider } from './selection-context';

const UserContext = createContext()

const GET_MY_CHANNELS = gql`
  {
    me {
      id
      name
      channels (per: 20) {
        title
        slug
        id
        counts {
          contents
        }
      }
    }
  }
`

export const UserProvider = withApollo((props) => {
  const { loading: loadingMyChannels, error: errorLoadingMyChannels, data: myChannels } = useQuery(GET_MY_CHANNELS)
  const [lazyLoadMyChannels, { loading, data }] = useLazyQuery(GET_MY_CHANNELS)

  if (loadingMyChannels) {
    return 'Loading your channels...'
  } else if (errorLoadingMyChannels) {
    console.error(errorLoadingMyChannels)
    return `Error: ${errorLoadingMyChannels}`
  }

  const channels = myChannels.me.channels
  const me = myChannels.me

  return (
    <UserContext.Provider value={{lazyLoadMyChannels, me, channels}} {...props}>
      <SelectionProvider>
        {props.children}
      </SelectionProvider>
    </UserContext.Provider>
  )
})

export const useUser = () => useContext(UserContext)