import { Button, Colors, InputGroup } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import withChannel from '@components/Channel';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import CreateGrove from '~/public/create-grove.svg';
import { useSelection } from '~/src/context/selection-context';
import { useTheme } from '~/src/context/theme-provider';

const CreateGroveAction = (props) => {
  const { createChannel } = props;
  const { theme } = useTheme();
  const nameInput = useRef(null);

  const { setSelectedChannel } = useSelection();

  const router = useRouter();

  const handleCreateChannel = async () => {
    const val = nameInput.current.value;
    await createChannel(
      { title: val },
      (data) => {
        console.log(data);
        setSelectedChannel(data.data.create_channel.channel);
        return router.push(
          `/g/[grove]`,
          `/g/${data.data.create_channel.channel.id}`,
          {
            shallow: true,
          },
        );
        // return data;
      },
      (error) => {
        console.log(error);
        return error;
      },
    );
  };

  return (
    <Popover2
      position="bottom-right"
      content={
        <section style={{ padding: 15, width: 350, paddingTop: 25 }}>
          <p style={{ marginBottom: 15 }}>
            <strong>Create a channel</strong>
          </p>
          <InputGroup
            large={true}
            fill={true}
            placeholder="Enter a name for your channel…"
            leftIcon="edit"
            style={{ marginBottom: 15 }}
            className="merge-input-disabled"
            inputRef={nameInput}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCreateChannel;
              }
            }}
          />
          <Button
            large={true}
            fill={true}
            icon="new-object"
            intent="primary"
            onClick={handleCreateChannel}
          >
            Create channel
          </Button>
        </section>
      }
    >
      <Button className="action" minimal={true}>
        <CreateGrove
          fill={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
          stroke={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
        />
      </Button>
    </Popover2>
  );
};

export default withChannel()(CreateGroveAction);
