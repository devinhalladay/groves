import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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
                href={`http://dev.are.na/oauth/authorize?client_id=${process.env.REACT_APP_APPLICATION_ID}&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}&response_type=code`}
              >
                Login
              </a>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
