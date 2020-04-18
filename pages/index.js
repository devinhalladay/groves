
//             <Panel className="formationNavigator" pinSide="left" panelTitle={"Formations"} defaultPosition={{x: 0, y: 60}} {...props}>
//               <ul>
//                 <li class="active">Folder Tree</li>
//                 <li>Mind Map</li>
//                 <li>Rhizome</li>
//                 <li>Frequency Chart</li>
//               </ul>
//             </Panel>
//             { props.selectedChannel &&
//               <Panel className="statusbar" pinSide="right" pinBottom={true} {...props}>
//                 <ul>
//                   <li>{props.selectedChannel.length} blocks</li>
//                 </ul>
//               </Panel>
//             }
//             { props.selectedChannel &&
//               <div className="blockList">
//                 {props.selectedChannel.contents.map(block =>
//                   <BlockRepresentation block={block} key={block.id} />)}
//               </div>
//             }
//           </div>

import React, { useEffect } from 'react'
import { useUser } from '../context/user-context'
import Header from '../components/Header'
import { Router, useRouter } from 'next/router'
import { useAuth } from '../context/auth-context'
import { parseCookies } from 'nookies'

const Root = (props) => {
  const router = useRouter()
  const auth = useAuth()

  return <Header />
}

export async function getServerSideProps(context) {
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
}

export default Root
