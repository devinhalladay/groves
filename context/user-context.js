import React, { useContext, createContext, useState, Children } from 'react'
import { AuthContext, useAuth } from './auth-context'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import ArenaClient from '../utils/arena-client'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import withApollo from '../lib/withApollo'

const UserContext = createContext()

const USER_CHANNELS_QUERY = gql`
  {
    me {
      channels (per: 10, page: 1) {
          title
          counts {
            contents
          }
      }
    }
  }
`

const FIND_GROVES_CONFIG = gql`
  {
    me {
      connection_search (per:1, q: "_grovesConfig", include_open_channels: false) {
        id
      }
    }
  }
`

const CREATE_GROVES_CONFIG = gql`
  mutation CreateConfigChannel {
    create_channel (input: {
      title:"_grovesConfig",
      visibility: PRIVATE,
      description: "This is your configuration channel for Groves. WARNING:If you edit the contents of this channel, your Groves instance may break."
    }) {
      channel {
        id
        href
      }
    }
  }
`

export const UserProvider = withApollo((props) => {
  const Arena = new ArenaClient()
  const [selectedChannel, setSelectedChannel] = useState(null)

  const { user } = useAuth();

  if (user) {
    const { loading: loadingMyChannels, error: errorLoadingMyChannels, data: myChannels } = useQuery(USER_CHANNELS_QUERY)
    const { loading: findingGrovesConfig, error: errorLoadingGrovesConfig, data: existingGrovesConfig } = useQuery(FIND_GROVES_CONFIG)

    if (loadingMyChannels || findingGrovesConfig) {
      return null
    } else if (errorLoadingMyChannels || errorLoadingGrovesConfig) {
      console.error(errorLoadingMyChannels || errorLoadingGrovesConfig)
      return `Error! ${errorLoadingMyChannels || errorLoadingGrovesConfig}`
    }

    console.log(existingGrovesConfig);
    

    // if (!existingGrovesConfig.me.connection_search.id) {
    //   const [createGrovesConfig, { data: newGrovesConfig }] = useMutation(CREATE_GROVES_CONFIG)
    // }
  
    let channels = myChannels.me.channels
    // if (channels) {
    //   setChannels(channels)
    // }
    
    if (!existingGrovesConfig.me.connection_search.id || !newGrovesConfig.me.connection_search.id) {
      return null
    }
    
    return (
      <UserContext.Provider value={{getUserChannels, channels, selectedChannel, setSelectedChannel, newGrovesConfig, existingGrovesConfig}} {...props} />
    )

    const getUserChannels = () => {}
  }
  
})

export const useUser = () => useContext(UserContext)