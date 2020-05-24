import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Router, useRouter } from 'next/router'
import { useAuth } from '../context/auth-context'
import { parseCookies } from 'nookies'
import Layout from '../components/Layout'
import DraggableBlock from '../components/DraggableBlock'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import withApollo from '../lib/withApollo'
import parse from 'html-react-parser'
import Panel from '../components/Panel'
import { getDirectiveValues } from 'graphql'

const GET_LANDING_BLOCKS = gql`
  {
    channel (id: 670488) {
      blokks {
        ... on Image {
          image_url
          description
        }
        
        ... on Text {
          title
          content (format: HTML)
          description
        }
      }
    }
  }
`

const Root = withApollo((props) => {
  const router = useRouter()
  const {loading, error, data } = useQuery(GET_LANDING_BLOCKS)
  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000
  })
  
  if (loading) {
    return "loading"
  } else if (error) {
    console.error(error)
    return `Error: ${error}`
  }
  
  return (
    <Layout>
      <Panel style={{
        width: '350px'
      }}
      className={"newsletter-panel"}
      defaultPosition={{x: 10, y: 470 }} panelTitle={"Subscribe to updates"} {...props}>
        <p>Get very occasional updates on development, beta testing, and launch dates.</p>
        <form action="https://network.us18.list-manage.com/subscribe/post?u=488634612d3795996b128e2ba&amp;id=d3ad9e4e39" method="post">
          <label htmlFor="EMAIL">Email address</label>
          <input name="EMAIL" type="email" placeholder="dev@groves.network"/>
          <input type="submit" value="Submit"/>
        </form>
      </Panel>
      {
        data.channel.blokks.map((blokk, i) => {
          const description = JSON.parse(blokk.description.replace('\n', ''))
          return (
            <DraggableBlock
              title={blokk.title ? blokk.title : null}
              type={blokk.image_url ? 'image' : 'text'}
              defaultPosition={{x: description.x, y: description.y }}
              dragStates={dragStates}
              setDragStates={setDragStates}
              >
              {
                blokk.content ?
                  parse(blokk.content)
                :
                blokk.image_url ?
                  <img draggable={false} src={blokk.image_url} alt={"an image of a shady grove"}/>
                :
                  <p>Welcome to Groves</p>
              }
            </DraggableBlock>
          )
        })
      }
    </Layout>
  )
})

// export async function getServerSideProps(context) {
//   if (process.env.AUTHENTICATION_ENABLED) {
//     if (parseCookies(context)['access_token']) {
//       context.res.writeHead(302, { Location: '/app' })
//       context.res.end()
  
//       return {
//         props: {isAuthenticated: true}
//       }
//     } else {
//       return {
//         props: {isAuthenticated: false}
//       }
//     }
//   } else {
//     return {props: {}}
//   }
// }

export default Root
