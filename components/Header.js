import React, { Component } from 'react'
import Panel from './Panel'
// import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";

const Header = props => {
  let isAuthenticated = false

  return (
    <Panel pinSide="center">
      <header>
        <nav>
          <ul>
            <li>
                <a>Home</a>
            </li>
            {isAuthenticated ? <li><a href="/orchard">Orchard</a></li> : null}
            {!isAuthenticated ? <li><a href={`https://dev.are.na/oauth/authorize?client_id=${process.env.REACT_APP_APPLICATION_ID}&redirect_uri=https://localhost:3000/oauth/callback&response_type=code`}>Login</a></li> : null}
          </ul>
        </nav>
      </header>
    </Panel>
  );
}

export default Header