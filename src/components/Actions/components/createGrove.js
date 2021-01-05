import { Button, Colors, Popover, Icon, InputGroup } from '@blueprintjs/core';
import React, { useRef } from 'react';
import CreateGrove from '~/public/create-grove.svg';
import { useTheme } from '~/src/context/theme-provider';
import { IconNames } from '@blueprintjs/icons';
import withChannel from '@components/Channel';

const CreateGroveAction = (props) => {
  const { createChannel } = props;
  const { theme } = useTheme();
  const nameInput = useRef(null);

  const handleCreateChannel = async () => {
    const val = nameInput.current.value;
    await createChannel(
      { title: val },
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  };

  return (
    <Popover position="bottom-right">
      <Button className="action" minimal={true}>
        <CreateGrove
          fill={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
          stroke={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
        />
      </Button>
      <section style={{ padding: 15, width: 350, paddingTop: 25 }}>
        <p style={{ marginBottom: 15 }}>
          <strong>Create a channel</strong>
        </p>
        <InputGroup
          large={true}
          fill={true}
          placeholder="Enter a name for your channel…"
          leftIcon={IconNames.EDIT}
          style={{ marginBottom: 15 }}
          className="merge-input-disabled"
          inputRef={nameInput}
        />
        <Button
          large={true}
          fill={true}
          icon={IconNames.NEW_OBJECT}
          intent="primary"
          onClick={handleCreateChannel}>
          Create channel
        </Button>
      </section>
    </Popover>
  );
};

export default withChannel()(CreateGroveAction);
