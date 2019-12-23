import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import Index from './views/Index'
import Home from './views/Home';
import Login from './views/Login';
import Header from './components/Header';

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    return (
      <Router>
        <div>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/home">
              <Home />
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