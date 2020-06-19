import React, { useContext, createContext, useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import withApollo from '../lib/withApollo'

const SelectionContext = createContext()

// {"errors":[{"message":"Type mismatch on variable $channelId and argument id (String! / ID!)","locations":[{"line":2,"column":11}],"fields":["query","channel","id"]}]}
// {"errors":[{"message":"Variable channelId of type ID! was provided invalid value","locations":[{"line":1,"column":8}],"value":null,"problems":[{"path":[],"explanation":"Expected value to not be null"}]}]}

const SelectionProvider = (props) => {
  const router = useRouter()

  const [selectedChannel, setSelectedChannel] = useState(null)
  
  // useEffect(() => {
  //   if (selectedChannel && selectedChannel.id) {
      
  //   }
  // }, [selectedChannel])

  return (
    <SelectionContext.Provider value={{selectedChannel, setSelectedChannel}} {...props} />
  )
}

const useSelection = () => useContext(SelectionContext)

export { useSelection, SelectionProvider, SelectionContext }