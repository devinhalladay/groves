import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Router, useRouter } from 'next/router'
import { useAuth } from '../context/auth-context'
import { parseCookies } from 'nookies'
import Layout from '../components/Layout'
import DraggableBlock from '../components/DraggableBlock'

const Root = (props) => {
  const router = useRouter()

  return (
    <Layout>
      <DraggableBlock title="Welcome to Groves">
        <p>Hello! You've arrived. I'm very glad to have you here.</p>
        <p>Groves is an upcoming, relational browsing and organization experience for <a target="_blank" href="https://www.are.na/">Are.na</a>.</p>
      </DraggableBlock>

      <DraggableBlock title="Follow us">
        <p>You can follow <a target="_blank" href="https://twitter.com/withgroves">Groves</a> on Twitter.</p>
        <p>You can also follow <a target="_blank" href="https://twitter.com/theflowingsky">its creator</a> on Twitter.</p>
      </DraggableBlock>

      <DraggableBlock type={'image'}>
          <img draggable="false" src="https://d2w9rnfcy7mm78.cloudfront.net/2829853/large_918414a15578d6db28d8b4adbe859ff2.png?1538896553?bc=1" alt=""/>
      </DraggableBlock>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  if (process.env.AUTHENTICATION_ENABLED) {
    if (parseCookies(context)['access_token']) {
      context.res.writeHead(302, { Location: '/app' })
      context.res.end()
  
      return {
        props: {isAuthenticated: true}
      }
    } else {
      return {
        props: {isAuthenticated: false}
      }
    }
  } else {
    return {props: {}}
  }
}

export default Root
