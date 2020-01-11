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

import { UserProvider } from './components/UserContext'

import { withCookies, Cookies } from 'react-cookie';


import Index from './views/Index'
import Orchard from './views/Orchard';
import Callback from './views/Callback';

import Header from './components/Header';

function App(props) {
  let localUser = localStorage.getItem('user')
  const { cookies } = props;
  

  const [user, setUser] = useState({
    isAuthenticated: localStorage.getItem('isAuthenticated') || cookies.get('arena_token'),
    ...JSON.parse(localUser)
  })

  const [isReady, isIsReady] = useState(false)


  

  const handleUserStatus = (action, user) => {
    
    switch (action) {
      case 'LOGIN':
        setUser({
          isAuthenticated: true,
          ...user
        })
        localStorage.setItem('user', JSON.stringify(user))
        break;
      case 'LOGOUT':
        setUser({
          isAuthenticated: false
        })
        localStorage.removeItem('user')
        cookies.remove('arena_token')
        break;

      default:
        break;
    }
  }

  // if (!isReady) {
  //   // check if auth token is present
  //   // if so, fetch the user from the API
  //     // if we can request the user, allow the app to boot
  //     // if the request for the user fails, clear the token
  //   // if not, all the app to boot so they can login
  //   return <Loading />;
  // }

  return (
      <Router>
        <div>
          <Header user={ user } handleAuth={handleUserStatus}></Header>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/oauth/callback">
              <Callback {...props} handleAuth={handleUserStatus} isAuthenticated={user.isAuthenticated} />
            </Route>
            <PrivateRoute user={user} authenticated={ user.isAuthenticated } path="/orchard">
              <Orchard user={ user }/>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
  );
}



export function PrivateRoute(props, { children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        props.authenticated ? (
          props.children
        ) : (
          <Redirect
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