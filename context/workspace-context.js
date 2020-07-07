import React, { useContext, createContext, useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import withApollo from '../lib/withApollo'

const WorkspaceContext = createContext()

const WorkspaceProvider = (props) => {
  const [workspaceOptions, setWorkspaceOptions] = useState(null)

  return (
    <WorkspaceContext.Provider value={{workspaceOptions, setWorkspaceOptions}} {...props} />
  )
}

const useWorkspace = () => useContext(WorkspaceContext)

export { useWorkspace, WorkspaceProvider, WorkspaceContext }