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
  // let isAuthenticated = localStorage.getItem('isAuthenticated')
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



// function AuthButton() {
//   let history = useHistory();

//   return fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome!{" "}
//       <button
//         onClick={() => {
//           fakeAuth.signout(() => history.push("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   ) : (
//     <p>You are not logged in.</p>
//   );
// }

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         fakeAuth.isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }



// function LoginPage() {
//   let history = useHistory();
//   let location = useLocation();

//   let { from } = location.state || { from: { pathname: "/" } };
//   let login = () => {
//     fakeAuth.authenticate(() => {
//       history.replace(from);
//     });
//   };

//   return (
//     <div>
//       <p>You must log in to view the page at {from.pathname}</p>
//       <button onClick={login}>Log in</button>
//     </div>
//   );
// }

export default withCookies(App)