import React from 'react';
import ConnectTo from './components/connectTo';
import CreateGroveAction from './components/createGrove';
import Panel from '~/src/components/Panel';
import CreateBlock from './components/createBlock';
import DarkModeAction from './components/darkMode';
import GroveFormations from '../Formations';
import MergeChannelsAction from './components/mergeChannels';
import { Navbar, Button, Alignment } from '@blueprintjs/core';

export default function GroveActions(props) {
  return (
    <Navbar className="panel panel--actions">
      <Navbar.Group>
        <GroveFormations />
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group>
        <CreateBlock {...props} />
        <ConnectTo />
        <CreateGroveAction />
        <DarkModeAction />
        <MergeChannelsAction />
      </Navbar.Group>
    </Navbar>
  );
}
