import React, {Fragment} from 'react'
import Header from './Header';
import { useSelection } from '../context/selection-context';
import { useUser } from '../context/user-context';

const Layout = props => {
  // const { selectedChannel, setSelectedChannel } = useSelection()
  // const { channels } = useUser()

  return (
    <Fragment>
      <div class="workspace">
        {props.children}
      </div>
    </Fragment>
  )
}

export const Container = props => {
  return props.children
}

export default Layout;