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
  const [currentList, setCurrentList] = useState(flatIndex);

  const handleChannelCheckbox = (e, channel) => {
    if (selection.length && selection.findIndex((c) => c.id === channel.id) !== -1) {
      const newChannels = selection.filter((c) => c.id !== channel.id);
      setSelection(newChannels);
    } else {
      setSelection([...selection, channel]);
    }
  };

  const handleDeleteChannels = (channel) => {
    selection.forEach((c) => {
      console.log(c);
      deleteChannel(c, (data) => {
        toast(`Deleted channel ID ${c.id}`);
        const newList = currentList.filter((chan) => chan.id !== c.id);
        setCurrentList(newList);
      });
    });
    setSelection([]);
  };

  const handleMultiSelect = (channel, i) => {
    const start = flatIndex.findIndex((c) => c.id === selection[selection.length - 1].id);
    // console.log(start);
    const end = i + 1;
    // console.log(end);
    const intermediateItems = currentList.slice(start, end);
    // console.log(intermediateItems);
    setSelection([...selection, ...intermediateItems]);
  };

  return (
    <div className="formation formation--channelIndex">
      <div className="workspace">
        <ul>
          {currentList.map((channel, i) => {
            return (
              <li key={channel.id}>
                <Checkbox
                  checked={selection.findIndex((c) => c.id === channel.id) > -1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 0,
                    flex: 1
                  }}
                  // onChange={(e) => {
                  //   console.log(e);
                  //   if (e.shiftKey) {
                  //     console.log(e);
                  //     handleChannelCheckbox(e, channel);
                  //   }
                  // }}
                  onChange={(e) => handleChannelCheckbox(e, channel)}>
                  <Card
                    onClick={(e) => {
                      if (e.shiftKey) {
                        handleMultiSelect(channel, i);
                      }
                    }}
                    style={{
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center'
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                      <p
                        style={{
                          textOverflow: 'ellipsis',
                          marginBottom: 5,
                          flex: '60%',
                          fontWeight: 'bold'
                        }}>
                        {channel.title}
                      </p>
                      <small
                        className="metadata"
                        style={{
                          fontSize: '14px',
                          color: 'darkgray'
                        }}>
                        {channel.counts.contents} blocks
                      </small>
                    </div>
                    <div
                      className="channel-actions"
                      style={{
                        flex: '40%',
                        display: 'inline-flex',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end'
                      }}>
                      <Button
                        icon={IconNames.TRASH}
                        onClick={() => handleDeleteChannels(channel)}
                      />
                    </div>
                  </Card>
                </Checkbox>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default withChannel()(ChannelIndex);
