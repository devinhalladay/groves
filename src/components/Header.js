import React, { Component } from 'react'
import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";

function Header(props) {
  let isAuthenticated = false

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <a>Home</a>
            </Link>
          </li>
          {isAuthenticated ? <li><Link to="/orchard"><a>Orchard</a></Link></li> : null}
          {!isAuthenticated ? <li><a href={`http://dev.are.na/oauth/authorize?client_id=${process.env.REACT_APP_APPLICATION_ID}&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}&response_type=code`}>Login</a></li> : null}
        </ul>
      </nav>
    </header>
  );
}

export default Header