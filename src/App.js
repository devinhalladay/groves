import React, { Component, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useLocation,
  withRouter,
  useHistory
} from "react-router-dom";

import useSWR from 'swr'

import { UserProvider } from './components/UserContext'

import { withCookies, Cookies } from 'react-cookie';

import axios from 'axios'

import Index from './views/Index'
import Orchard from './views/Orchard';
import Callback from './views/Callback';

import Header from './components/Header';

import ArenaClient from './arena-client';

function App(props) {
  const { cookies } = props;
  const [user, setUser] = useState({
    isAuthenticated: typeof cookies.get('arena_token') !== 'undefined'
  })
  const [channels, setChannels] = useState({})
  const [isReady, isIsReady] = useState(false)

  // let history = useHistory()

  useEffect(() => {
    if (!isReady) {
      if (cookies.get('arena_token')) {
        let Arena = new ArenaClient(cookies.get('arena_token'))
        Arena.setMe(Arena.getMe()).then((me) => {
          setUser({
            ...user,
            me
          })
  
        Arena.getChannelsForMe()
          .then(chans => {
            setChannels({
              ...channels,
              ...chans
            })
          })
        }).catch(e => cookies.remove('arena_token'))
  
        isIsReady(true)
      } else {
        // history.push('/orchard')
      }
    }
  }, [])

  return (
    <Router>
      <div>
        <Header></Header>
        <Switch>
          
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/oauth/callback">
            <Callback {...props} isAuthenticated={user.isAuthenticated} />
          </Route>
          <PrivateRoute channels={channels} authenticated={ user.isAuthenticated } path="/orchard">
            <Orchard channels={channels}/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}
//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>

  
  // if (!isReady) {
  //   // check if auth token is present
  //   // if so, fetch the user from the API
  //     // if we can request the user, allow the app to boot
  //     // if the request for the user fails, clear the token
  //   // if not, all the app to boot so they can login
  //   return <Loading />;
  // }



export function PrivateRoute(props, { children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        props.authenticated ? (
          props.children
        ) : (
          <Redirect
            push
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default withCookies(App)