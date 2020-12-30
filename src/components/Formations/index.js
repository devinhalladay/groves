import React from 'react';
import Panel from '~/src/components/Panel';
import Grid from './components/grid';
import { HTMLSelect } from '@blueprintjs/core';
import { useWorkspace } from '@context/workspace-context';

export default function GroveActions() {
  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();

  const handleChangeFormation = (e) => {
    setWorkspaceOptions({
      ...workspaceOptions,
      formation: e.currentTarget.value
    });
  };

  return (
    <Panel panelType="formations">
      <div className="grove-formations">
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
            }
          ]}
          defaultValue="canvas"
        />
      </div>
    </Panel>
  );
}
