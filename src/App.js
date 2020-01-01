import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import Index from './views/Index'
import Grove from './views/Grove';
import Login from './views/Login';

import Header from './components/Header';

export default class App extends Component {
  render(props) {
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/grove">
              <Grove />
            </Route>
            <Route path="/login">
              <Login {...props} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}