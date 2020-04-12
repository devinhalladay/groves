import React, { Component } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { setState, useState } from 'react'

import { LoginLink, LogoutLink } from './AuthLinks'
import { login } from '../utils/auth'

const Menu = () => {
  const router = useRouter()

  const [showMenu, setShowMenu] = useState(false)
  const closeMenu = () => setShowMenu(false)

  const handleMenuClick = e => {
    e.preventDefault()

    setShowMenu(!showMenu)
  }

    return (
      <div>
        <button onClick={handleMenuClick}>
          <div className="icon icon--caret-down">
            <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.14645 5.14645L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H9.79289C10.2383 0 10.4614 0.538572 10.1464 0.853554L5.85355 5.14645C5.65829 5.34171 5.34171 5.34171 5.14645 5.14645Z" fill="#333333"/>
            </svg>
          </div>
        </button>
        
        {
          showMenu
            ? (
              <div
                className="menu"
                // ref={(element) => {
                //   this.dropdownMenu = element;
                // }}
              >
                <LogoutLink />
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
}

export default Menu