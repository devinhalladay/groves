import React from 'react';
import ConnectToAction from './components/connectTo';
import CreateGroveAction from './components/createGrove';
import Panel from '~/components/Panel';

export default function GroveActions() {
  return (
    <Panel panelType="actions">
      <div className="grove-actions">
        <div className="label">Actions</div>
        <ConnectToAction />
        <CreateGroveAction />
      </div>
    </Panel>
  );
}
