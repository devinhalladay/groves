import React from 'react';
import Panel from '~/src/components/Panel';
import Grid from './components/Grid';
import { ControlGroup, HTMLSelect, MenuItem, Button } from '@blueprintjs/core';
import { useWorkspace } from '@context/workspace-context';
import { Select } from '@blueprintjs/select';

export default function GroveFormations() {
  const { workspaceOptions, setWorkspaceOptions, formations } = useWorkspace();
  const { formation } = workspaceOptions;

  const handleChangeFormation = (f) => {
    setWorkspaceOptions({
      ...workspaceOptions,
      formation: f
    });
  };

  const formationOptionRenderer = (formationOption) => {
    const that = formations[formationOption];
    return (
      <MenuItem
        icon={that.icon}
        text={that.title}
        active={formation === that}
        onClick={() => handleChangeFormation(that)}
        shouldDismissPopover={false}
      />
    );
  };

  return (
    <Select
      itemRenderer={formationOptionRenderer}
      items={Object.keys(formations)}
      filterable={false}>
      <Button
        text={workspaceOptions.formation.title}
        rightIcon="double-caret-vertical"
        icon={formation.icon}
      />
    </Select>
  );
}
