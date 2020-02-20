import React, { Component } from 'react'
import Panel from './Panel'
// import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";

const Header = props => {
  let isAuthenticated = true

  if (isAuthenticated) {
    return (
      <Panel pinSide="center">
        <header>
          <nav>
            <div className="orchard-title">
              <p><a href={`https://dev.are.na/oauth/authorize?client_id=${process.env.APPLICATION_ID}&redirect_uri=${process.env.APPLICATION_CALLBACK}&response_type=code`}>https://www.are.na/<strong>devin-halladay/</strong></a></p>
              <div className="icon icon--caret-down">
                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.14645 5.14645L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H9.79289C10.2383 0 10.4614 0.538572 10.1464 0.853554L5.85355 5.14645C5.65829 5.34171 5.34171 5.34171 5.14645 5.14645Z" fill="#333333"/>
                </svg>
              </div>
            </div>
            <form action="#" className="grove-navigation">
              <input type="text" placeholder="Enter channel name…"/>
            </form>
          </nav>
        </header>
      </Panel>
    )
  } else {
    return (
      <Panel pinSide="center">
        <header>
          <nav>
            <ul>
              <li>
                <a>Home</a>
              </li>
              {isAuthenticated ? <li><a href="/orchard">Orchard</a></li> : null}
              {!isAuthenticated ? <li><a href={`https://dev.are.na/oauth/authorize?client_id=${process.env.APPLICATION_ID}&redirect_uri=${process.env.SERVER_AUTH_CALLBACK}&response_type=code`}>Login</a></li> : null}
            </ul>
          </nav>
        </header>
      </Panel>
    );
  }
}

export default Header