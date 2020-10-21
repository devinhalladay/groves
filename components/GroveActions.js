import React from 'react'
import ConnectToAction from './ConnectToAction';
import CreateGroveAction from './CreateGroveAction';
import Panel from './Panel';
import StageConnectionsFromAction from './StageConnectionsFromAction';

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
