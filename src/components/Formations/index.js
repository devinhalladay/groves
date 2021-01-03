import React from 'react';
import Panel from '~/src/components/Panel';
import Grid from './components/Grid';
import { ControlGroup, HTMLSelect } from '@blueprintjs/core';
import { useWorkspace } from '@context/workspace-context';

export default function GroveFormations() {
  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();

  const handleChangeFormation = (e) => {
    setWorkspaceOptions({
      ...workspaceOptions,
      formation: e.currentTarget.value
    });
  };

  return (
    <div className="grove-formations">
      <ControlGroup
        fill={true}
        vertical={false}
        style={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <div className="label">
          <span>Views</span>
        </div>
        <HTMLSelect
          onChange={handleChangeFormation}
          options={[
            {
              label: 'Canvas',
              value: 'canvas'
            },
            {
              label: 'Grid',
              value: 'grid'
            },
            {
              label: 'Channel Index',
              value: 'channelIndex'
            }
          ]}
          defaultValue="channelIndex"
        />
      </ControlGroup>
    </div>
  );
}
