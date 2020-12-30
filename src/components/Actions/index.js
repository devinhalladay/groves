import React from 'react';
import ConnectTo from './components/connectTo';
import CreateGroveAction from './components/createGrove';
import Panel from '~/src/components/Panel';
import CreateBlock from './components/createBlock';

export default function GroveActions() {
  return (
    <Panel panelType="actions">
      <div className="grove-actions">
        <div className="label">Actions</div>
        <CreateBlock />
        <ConnectTo />
        <CreateGroveAction />
      </div>
    </Panel>
  );
}
