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
        <GrovesCanvas />
      }
    </Layout>
  )
}

export async function getServerSideProps(context) {
  if (!parseCookies(context)['access_token']) {
    context.res.writeHead(301, { Location: '/' })
    context.res.end()
  }

  return {props: {}}
}

export default GrovesApp