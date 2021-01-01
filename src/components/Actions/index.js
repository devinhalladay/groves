import React from 'react';
import ConnectTo from './components/connectTo';
import CreateGroveAction from './components/createGrove';
import Panel from '~/src/components/Panel';
import CreateBlock from './components/createBlock';
import DarkModeAction from './components/darkMode';

export default function GroveActions() {
  return (
    <Panel panelType="actions">
      <div className="grove-actions">
        <CreateBlock />
        <ConnectTo />
        <CreateGroveAction />
        <DarkModeAction />
      </div>
    </Panel>
  );
}
