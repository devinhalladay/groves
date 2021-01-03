import { Button, Card, Checkbox } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import withChannel from '@components/Channel';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelection } from '~/src/context/selection-context';
import { useUser } from '~/src/context/user-context';

const ChannelIndex = (props) => {
  const { deleteChannel } = props;
  const { flatIndex } = useUser();
  // const { selection, setSelection } = useSelection();
  const [selection, setSelection] = useState([]);

  let currentList = flatIndex;

  const handleChannelCheckbox = (e, channel) => {
    if (e) {
      console.log(e.nativeEvent.shiftKey);
    }
    if (selection.includes(channel)) {
      const channels = selection.filter((c) => c.id !== channel.id);
      // const idx = selection.findIndex(c => c.id !== channel.id)
      setSelection(channels);
    } else {
      setSelection([...selection, channel]);
    }
  };

  const handleDeleteChannels = (channel) => {
    selection.forEach((c) => {
      console.log(c);
      deleteChannel(c, (data) => {
        toast(`Deleted block ${channel.title} (ID ${channel.id})`);
      });
      currentList = currentList.filter((chan) => chan.id !== channel.id);
    });
  };

  return (
    <div className="formation formation--channelIndex">
      <div className="workspace">
        <ul>
          {flatIndex.map((channel) => {
            return (
              <li key={channel.id}>
                <Card
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <Checkbox
                    style={{
                      flex: '60%',
                      textOverflow: 'ellipsis',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 0
                    }}
                    onChange={(e) => {
                      console.log(e);
                      if (e.nativeEvent.shiftKey) {
                        console.log(e);
                        handleChannelCheckbox(e, channel);
                      }
                    }}
                    // onChange={() => handleChannelCheckbox(null, channel)}
                  >
                    <p
                      style={{
                        textOverflow: 'ellipsis'
                      }}>
                      {channel.title}
                    </p>
                  </Checkbox>
                  <div
                    className="channel-actions"
                    style={{
                      flex: '40%',
                      display: 'inline-flex',
                      alignSelf: 'flex-end',
                      justifyContent: 'flex-end'
                    }}>
                    <Button icon={IconNames.TRASH} onClick={() => handleDeleteChannels(channel)} />
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default withChannel()(ChannelIndex);
