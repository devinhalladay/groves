import React from 'react';
import ConnectTo from './components/connectTo';
import CreateGroveAction from './components/createGrove';
import Panel from '~/src/components/Panel';
import CreateBlock from './components/createBlock';
import DarkModeAction from './components/darkMode';
import GroveFormations from '../Formations';
import MergeChannelsAction from './components/mergeChannels';

export default function GroveActions() {
  return (
    <Panel panelType="actions">
      <div className="grove-actions">
        <GroveFormations />
        <CreateBlock />
        <ConnectTo />
        <CreateGroveAction />
        <DarkModeAction />
        <MergeChannelsAction />
      </div>
    </Panel>
  );
}
