import React, { Component } from 'react'
import Panel from './Panel'
// import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import GrovesNavigator from './GrovesNavigator'
import Menu from './Menu'

const Header = ({setIsReady, isUserAuthenticated, user, me, setSelectedChannel, selectedChannel, channels}) => {
  if (isUserAuthenticated) {
    return (
      <Panel pinSide="center">
        <header>
          <nav>
            <div className="orchard-title">
              <a href={`https://are.na/${me.slug}`}><span className="gray">https://www.are.na/</span><strong>{me.slug}/</strong></a>
              <Menu></Menu>
            </div>
            <GrovesNavigator setIsReady={setIsReady} setSelectedChannel={setSelectedChannel} channels={channels} />
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
              <li><a href={`https://dev.are.na/oauth/authorize?client_id=${process.env.APPLICATION_ID}&redirect_uri=${process.env.APPLICATION_CALLBACK}&response_type=code`}>Login</a></li>
            </ul>
          </nav>
        </header>
      </Panel>
    );
  }
}

export default Header