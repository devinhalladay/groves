import React from 'react'
import Header from './Header';

const Layout = props => {
  return (
    <div class="workspace">
      <Header {...props} />
      {props.children}
    </div>
  )
}

export const Container = props => {
  return props.children
}

export default Layout;