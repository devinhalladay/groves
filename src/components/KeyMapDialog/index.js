import { Button, Dialog } from '@blueprintjs/core';
import { getApplicationKeyMap, GlobalHotKeys } from 'react-hotkeys';
import { IconNames } from '@blueprintjs/icons';
import { Code, KeyCombo } from '@blueprintjs/core';
import { useState } from 'react';
import { useSelection } from '@context/selection-context';
import { useWorkspace } from '@context/workspace-context';
import KeyMaps from '~/src/constants/KeyMaps';

const KeyMapDialog = () => {
  const globalKeyMap = getApplicationKeyMap();

  const { workspaceOptions, formations } = useWorkspace();
  const { formation } = workspaceOptions;

  console.log(globalKeyMap);

  const [isOpen, setIsOpen] = useState(false);

  const hotkeyHandlers = {
    VIEW_SHORTCUTS: (e) => {
      e.preventDefault();
      setIsOpen(true);
    }
  };
  return (
    <>
      <GlobalHotKeys keyMap={KeyMaps} handlers={hotkeyHandlers} />
      <div
        style={{
          position: 'fixed',
          bottom: 15,
          right: formation.key === formations.CANVAS.key ? 55 : 15
        }}>
        <Button
          onClick={() => setIsOpen(true)}
          icon={IconNames.HELP}
          large={true}
          style={{ borderRadius: '100%' }}></Button>
        {isOpen && (
          <Dialog
            title="Keyboard Shortcuts"
            icon={IconNames.KEY}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}>
            <div style={{ padding: 15 }}>
              {Object.keys(globalKeyMap).map((action, i) => {
                const { sequences, name, group } = globalKeyMap[action];

                return (
                  <div
                    key={name}
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      marginBottom: 15
                    }}>
                    <div
                      style={
                        {
                          // flex: 1
                        }
                      }>
                      <p style={{ paddingRight: 15, justifySelf: 'flex-end' }}>
                        {sequences.map(({ sequence }) => (
                          <KeyCombo key={sequence} combo={sequence} />
                        ))}
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1
                      }}>
                      <p>{name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default KeyMapDialog;
