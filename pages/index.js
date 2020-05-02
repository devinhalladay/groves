import React, { useEffect } from 'react'
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

const GET_LANDING_BLOCKS = gql`
  {
    channel (id: 670488) {
      blokks {
        ... on Image {
          image_url
        }
        
        ... on Text {
          title
          content (format: HTML)
        }
      }
    }
  }
`

const Root = withApollo((props) => {
  const router = useRouter()
  const {loading, error, data } = useQuery(GET_LANDING_BLOCKS)

  // console.log(data); // returns {channel: {…}}
  // console.log(data.channel.blokks) // data is undefined

  if (loading) {
    return "loading"
  } else if (error) {
    console.error(error)
    return `Error: ${error}`
  }

  console.log(data.channel.blokks);
  
  return (
    <Layout>
      <Panel style={{
        width: '250px'
      }}
      className={"newletter-panel"}
      positionOffset={{x: `${Math.floor(Math.random() * Math.floor(100))}%`, y: `${Math.floor(Math.random() * Math.floor(100))}%`}} panelTitle={"Subscribe to updates"} {...props}>
        <form action="">
          <label htmlFor="EMAIL">Email address</label>
          <input name="EMAIL" type="email" placeholder="dev@groves.network"/>
          <input type="submit" value="Submit"/>
        </form>
      </Panel>
      {
        data.channel.blokks.map((blokk, i) => {
          return (
            <DraggableBlock 
              title={blokk.title ? blokk.title : null}
              type={blokk.image_url ? 'image' : null}
              defaultPosition={{x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) }}
              bounds={'parent'}>
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
