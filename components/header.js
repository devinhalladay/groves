import React, { Component, useContext } from 'react'
import Panel from './Panel'
// import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import GrovesNavigator from './GrovesNavigator'
import Menu from './Menu'

import { auth, withAuthSync } from '../utils/auth'

import { LoginLink } from './AuthLinks'
import UserContext, { useUser } from '../context/user-context'
import { useAuth } from '../context/auth-context'

const Header = ({ setSelectedChannel, channels }) => {
  const { user } = useAuth();

  if (user) {
    return (
      <Panel pinSide="center">
        <header>
          <nav>
            <div className="orchard-title">
              <a href={`https://are.na/${user.slug}`}><span className="gray">https://www.are.na/</span><strong>{user.slug}/</strong></a>
              <Menu></Menu>
            </div>
            <GrovesNavigator setSelectedChannel={setSelectedChannel} channels={channels} />
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
              <li><LoginLink /></li>
            </ul>
          </nav>
        </header>
      </Panel>
    );
  }
}

export default Header