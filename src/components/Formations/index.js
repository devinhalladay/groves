import React from 'react';
import Panel from '~/src/components/Panel';
import Grid from './components/Grid';
import { ControlGroup, HTMLSelect, MenuItem, Button, Hotkeys } from '@blueprintjs/core';
import { useWorkspace } from '@context/workspace-context';
import { Select } from '@blueprintjs/select';
import { GlobalHotKeys, HotKeys } from 'react-hotkeys';

export default function GroveFormations() {
  const { workspaceOptions, setWorkspaceOptions, formations } = useWorkspace();
  const { formation } = workspaceOptions;

  // const keyMap = {
  //   VIEW_GRID: {
  //     name: 'Grid view',
  //   },
  //   VIEW_CANVAS: {
  //     name: 'Canvas view',
  //     sequence: 'w 2',
  //     action: () => handleChangeFormation(formations.CANVAS)
  //   },
  //   VIEW_CHANNEL_INDEX: {
  //     name: 'Channel Index view',
  //     sequence: 'w 3',
  //     action: () => handleChangeFormation(formations.CHANNEL_INDEX)
  //   }
  // };

  const keyMap = {
    VIEW_GRID: {
      name: 'Grid view',
      sequence: 'w 1',
      group: 'Global Shortcuts'
    },
    VIEW_CANVAS: {
      name: 'Canvas view',
      sequence: 'w 2',
      group: 'Global Shortcuts'
    },
    VIEW_CHANNEL_INDEX: {
      name: 'Channel Index view',
      sequence: 'w 3',
      group: 'Global Shortcuts'
    }
  };

  const handleChangeFormation = (f) => {
    setWorkspaceOptions({
      ...workspaceOptions,
      formation: f
    });
  };

  const hotkeyHandlers = {
    VIEW_GRID: React.useCallback(() => handleChangeFormation(formations.GRID)),
    VIEW_CHANNEL_INDEX: React.useCallback(() => handleChangeFormation(formations.CHANNEL_INDEX)),
    VIEW_CANVAS: React.useCallback(() => handleChangeFormation(formations.CANVAS))
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
    <>
      <GlobalHotKeys handlers={hotkeyHandlers} keyMap={keyMap} />
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
    </>
  );
}
