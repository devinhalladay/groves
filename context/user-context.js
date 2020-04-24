import React, { useContext, createContext, useState, Children, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useAuth } from './auth-context';
import withApollo from '../lib/withApollo';

const UserContext = createContext()

const GET_MY_CHANNELS = gql`
  {
    me {
      id
      name
      channels (per: 20) {
        title
        counts {
          contents
        }
      }
    }
  }
`

export const UserProvider = withApollo((props) => {
  const [user, setUser] = useState(props.user)
  // const [channels, setChannels] = useState(null)
  
  const { loading: loadingMyChannels, error: errorLoadingMyChannels, data: myChannels } = useQuery(GET_MY_CHANNELS)
  const [lazyLoadMyChannels, { loading, data }] = useLazyQuery(GET_MY_CHANNELS)

  if (loadingMyChannels) {
    return 'Loading your channels...'
  } else if (errorLoadingMyChannels) {
    console.error(errorLoadingMyChannels)
    return `Error: ${errorLoadingMyChannels}`
  }

  const channels = myChannels.me.channels

  return (
    <UserContext.Provider value={{user, lazyLoadMyChannels, channels}} {...props} />
  )
})

export const useUser = () => useContext(UserContext)