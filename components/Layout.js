import React from 'react'
import Header from './Header';
import { useSelection } from '../context/selection-context';
import { useUser } from '../context/user-context';

const Layout = props => {
  // const { selectedChannel, setSelectedChannel } = useSelection()
  // const { channels } = useUser()

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