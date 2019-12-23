import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { logout } from "../api/auth";

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/home">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <a
                href={`http://dev.are.na/oauth/authorize?client_id=${process.env.REACT_APP_APP_ID}&redirect_uri=${process.env.REACT_APP_LOCAL_CALLBACK}&response_type=code`}
              >
                Login
              </a>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}