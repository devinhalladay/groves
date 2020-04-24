import React, { useEffect } from 'react'
import { ServerResponse } from "http";
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth-context'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter, Router } from 'next/router'
import { gql } from 'apollo-boost';
import { useUser } from '../../context/user-context'
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../../lib/withApollo';
import GrovesCanvas from '../../components/GrovesCanvas';
import { useSelection, SelectionContext } from '../../context/selection-context'

const GrovesApp = (props) => {
  const { selectedChannel, setSelectedChannel } = useSelection()

  return (
    <Layout {...props} >
      {selectedChannel &&
        <div>
          <h1>{selectedChannel.title}</h1>
          <small>{selectedChannel.counts.contents}</small>
        </div>
      }
    </Layout>
  )
}

export default GrovesApp