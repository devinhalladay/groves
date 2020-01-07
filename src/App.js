import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useLocation,
  withRouter
} from "react-router-dom";

// import { History } from 'history'


import { withCookies, Cookies } from 'react-cookie';


import Index from './views/Index'
import Orchard from './views/Orchard';
import Login from './views/Callback';

import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authenticated: false,
      user: {},
      grove: {}
    }

    this.handleUpdateLoginState = this.handleUpdateLoginState.bind(this)
  }

  handleUpdateLoginState(user) {
    const { cookies } = this.props;

    if (!this.state.authenticated) {
      this.setState({
        user: user
      }, () => {
        this.setState({
          authenticated: true,
        })
      })
    } else {
      this.setState({
        authenticated: false
      }, () => {
        // cookies.remove('arena_auth_token')
        // this.props.history.push('/');
      })

      
    }
  }


  render(props) {
    console.log(Cookies.get('arena_token'));
    
    return (
      <Router>
        <div>
          <Header handleUpdateLoginState={this.handleUpdateLoginState}></Header>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/oauth/callback">
              <Login {...props} handleUpdateLoginState={this.handleUpdateLoginState} />
            </Route>
            <PrivateRoute authenticated={this.state.authenticated} path="/orchard">
              <Orchard user={ this.state.user }/>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
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