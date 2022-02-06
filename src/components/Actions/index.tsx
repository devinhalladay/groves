import { Button, Navbar } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import React from 'react';
import Formations from '~/src/constants/Formations';
import { useWorkspace } from '~/src/context/workspace-context';
import GroveFormations from '../Formations';
import ConnectTo from './components/connectTo';
import CreateBlock from './components/createBlock';
import CreateGroveAction from './components/createGrove';
import DarkModeAction from './components/darkMode';
import MergeChannelsAction from './components/mergeChannels';

export default function GroveActions(props) {
  const router = useRouter();

  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  return (
    <Navbar className="panel panel--actions">
      {router.query.grove ? (
        <>
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
        </>
      ) : (
        <>
          <Navbar.Group>
            <Button
              minimal={true}
              icon="grid-view"
              className="action"
              style={{ paddingRight: 10 }}
              onClick={() =>
                setWorkspaceOptions({ formation: Formations.GRID })
              }
              active={formation.key === Formations.GRID.key}
            ></Button>
            <Button
              minimal={true}
              icon="list"
              className="action"
              onClick={() =>
                setWorkspaceOptions({ formation: Formations.CHANNEL_INDEX })
              }
              active={formation.key === Formations.CHANNEL_INDEX.key}
            ></Button>
          </Navbar.Group>

          <Navbar.Group>
            <CreateGroveAction />
            <DarkModeAction />
          </Navbar.Group>
        </>
      )}
    </Navbar>
  );
}
