import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
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