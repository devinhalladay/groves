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
import { useSelection } from '../../context/selection-context'

export default withApollo((props) => {
  const router = useRouter()
  const auth = useAuth()
  const prevSession = auth.hasPreviousSession()
  const { selectedChannel, setSelectedChannel } = useSelection()

  if (props.isAuthenticated) {
    // const { loading, data } = useQuery(¡¡¡¡¡QUERY);

    // if (loading || !data) {
    //   return (
    //     <Layout>
    //       <h1>Loading...</h1>
    //     </Layout>
    //   )
    // }

    return (
      <Layout selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel}>
        <h1>test</h1>
        {selectedChannel &&
          <div>
            <h1>{selectedChannel.title}</h1>
            <small>{selectedChannel.counts.contents}</small>
          </div>
        }
      </Layout>
    )
  }

  return 'hello you are here'
})

export async function getServerSideProps(context) {
  if (!parseCookies(context)['access_token']) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()

    return {
      props: {isAuthenticated: false}, // will be passed to the page component as props
    }
  } else {
    return {
      props: {isAuthenticated: true}, // will be passed to the page component as props
    }
  }
}