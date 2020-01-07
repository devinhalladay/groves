import React, { Component } from 'react'
import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";


class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <a>Groves</a>
              </Link>
            </li>
            <li><Link to="/orchard">
              <a>Orchard</a>
            </Link></li>
            <li>
              <a
                href={`http://dev.are.na/oauth/authorize?client_id=${process.env.REACT_APP_APPLICATION_ID}&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}&response_type=code`}
              >
                Login
              </a>
            </li>
            <li>
              <button onClick={this.props.handleUpdateLoginState}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}


export default withRouter(Header)