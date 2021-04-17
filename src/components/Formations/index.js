import React from 'react';
import Panel from '~/src/components/Panel';
import Grid from './components/Grid';
import { ControlGroup, HTMLSelect, MenuItem, Button, Hotkeys } from '@blueprintjs/core';
import { useWorkspace } from '@context/workspace-context';
import { Select } from '@blueprintjs/select';
import { GlobalHotKeys } from 'react-hotkeys';
import KeyMaps from '~/src/constants/KeyMaps';
import Formations from '~/src/constants/Formations';

export default function GroveFormations() {
  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  const handleChangeFormation = (f) => {
    setWorkspaceOptions({
      ...workspaceOptions,
      formation: f
    });
  };

  const hotkeyHandlers = {
    VIEW_GRID: React.useCallback(() => handleChangeFormation(Formations.GRID)),
    VIEW_CHANNEL_INDEX: React.useCallback(() => handleChangeFormation(Formations.CHANNEL_INDEX)),
    VIEW_CANVAS: React.useCallback(() => handleChangeFormation(Formations.CANVAS))
  };

  const formationOptionRenderer = (formationOption) => {
    const that = Formations[formationOption];
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
    <>
      <GlobalHotKeys handlers={hotkeyHandlers} keyMap={KeyMaps} />
      <Select
        itemRenderer={formationOptionRenderer}
        items={Object.keys(Formations)}
        filterable={false}>
        <Button
          minimal={true}
          text={workspaceOptions.formation.title}
          rightIcon="double-caret-vertical"
          icon={formation.icon}
        />
      </Select>
    </>
  );
}
