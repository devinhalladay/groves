import React from 'react'
import Panel from './Panel'
import GrovesNavigator from './GrovesNavigator'
import Menu from './Menu'
import { LoginLink } from './AuthLinks'
import { useAuth } from '../context/auth-context'

const Header = props => {
  const { user } = useAuth();

  if (user) {
    return (
      <Panel pinSide="center" panelType="nav">
        <header>
          <nav>
            <div className="orchard-title">
              <a href={`https://are.na/${user.slug}`}><span className="gray">https://www.are.na/</span><strong>{user.slug}/</strong></a>
              <Menu></Menu>
            </div>
            <GrovesNavigator />
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