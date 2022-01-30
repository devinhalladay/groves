import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { useWorkspace } from '@context/workspace-context';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import Formations from '~/src/constants/Formations';
import KeyMaps from '~/src/constants/KeyMaps';

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
    // VIEW_FOLDERS: React.useCallback(() => handleChangeFormation(Formations.FOLDERS))
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
