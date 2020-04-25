import React, { Component } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { setState, useState } from 'react'

import { LoginLink, LogoutLink } from './AuthLinks'
import { useAuth } from '../context/auth-context';
import { useUser } from '../context/user-context';

const Dropdown = props => {
  const { logout } = useAuth()

  return (
    <div className="groves-dropdown">
      <ul>
        <li>Welcome, {props.user.username}</li>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  )
}

const Menu = () => {
  const router = useRouter()
  const { user } = useAuth()

  const [showMenu, setShowMenu] = useState(false)
  const closeMenu = () => setShowMenu(false)

  const handleMenuClick = e => {
    e.preventDefault()

    setShowMenu(!showMenu)
  }

    return (
      <div>
        <button className="groves-menu-button" onClick={handleMenuClick}>
          <div className="icon icon--caret-down">
            <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.07069 3.53553L4.53516 7.07107L0.999622 3.53553" stroke="white" stroke-width="1"/>
            </svg>          
          </div>
        </button>
        
        {
          showMenu
            ? (
              <Dropdown user={user} />
            )
            : (
              null
            )
        }
      </div>
    );
}

export default Menu
