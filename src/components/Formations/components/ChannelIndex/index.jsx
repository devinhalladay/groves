import { Button, Card, Checkbox } from '@blueprintjs/core';
import { Icons } from '@blueprintjs/icons';
import withChannel from '@components/Channel';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelection } from '~/src/context/selection-context';
import { useUser } from '~/src/context/user-context';

const ChannelIndex = (props) => {
  const { deleteChannel } = props;
  const { flatIndex } = useUser();
  // const { selection, setSelections } = useSelection();
  const { selections, setSelections } = useSelection();
  const [currentList, setCurrentList] = useState(flatIndex);

  const handleChannelCheckbox = (e, channel) => {
    if (selections.length && selections.findIndex((c) => c.id === channel.id) !== -1) {
      const newChannels = selections.filter((c) => c.id !== channel.id);
      setSelections(newChannels);
    } else {
      setSelections([...selections, channel]);
    }
  };

  const handleDeleteChannels = (channel) => {
    selections.forEach((c) => {
      deleteChannel(c, (data) => {
        toast(`Deleted channel ID ${c.id}`);
        const newList = currentList.filter((chan) => chan.id !== c.id);
        setCurrentList(newList);
      });
    });
    setSelections([]);
  };

  const handleMultiSelect = (channel, i) => {
    const start = flatIndex.findIndex((c) => c.id === selections[selections.length - 1].id);
    const end = i + 1;
    const intermediateItems = currentList.slice(start, end);
    setSelections([...selections, ...intermediateItems]);
  };

  return (
    <div className="formation formation--channelIndex">
      <div className="workspace">
        <ul>
          {currentList.map((channel, i) => {
            return (
              <li key={channel.id}>
                <Checkbox
                  checked={selections.findIndex((c) => c.id === channel.id) > -1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 0,
                    flex: 1
                  }}
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
                      alignItems: 'center',
                      userSelect: 'none'
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
                        icon='trash'
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
