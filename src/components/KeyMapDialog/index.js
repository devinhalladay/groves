import { Button, Dialog } from '@blueprintjs/core';
import { getApplicationKeyMap } from 'react-hotkeys';
import { IconNames } from '@blueprintjs/icons';
import { Code, KeyCombo } from '@blueprintjs/core';
import { useState } from 'react';

const KeyMapDialog = () => {
  const keyMap = getApplicationKeyMap();

  console.log(keyMap);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} icon={IconNames.HELP}></Button>
      {isOpen && (
        <Dialog
          title="Keyboard Shortcuts"
          icon={IconNames.KEY}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}>
          <div style={{ padding: 15 }}>
            {Object.keys(keyMap).map((action, i) => {
              const { sequences, name, group } = keyMap[action];

              return (
                <div
                  key={name}
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    marginBottom: 15
                  }}>
                  <p style={{ paddingRight: 15 }}>
                    {sequences.map(({ sequence }) => (
                      <KeyCombo key={sequence} combo={sequence} />
                    ))}
                  </p>
                  <p>{name}</p>
                </div>
              );
            })}
          </div>
        </Dialog>
      )}
    </>
  );
};

export default KeyMapDialog;
