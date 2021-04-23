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

  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmedDelete, setConfirmedDelete] = useState(false);

  const handleDeleteSingleChannel = (channel) => {
    let list = currentList;
    deleteChannel(channel, () => {
      list = list.filter((chan) => chan.id !== channel.id);
      setCurrentList(list);
      toast(`Deleted channel ID ${channel.id}`);
    });
  };

  const handleDeleteMultipleChannels = () => {
    let list = currentList;

    selections.forEach((c) => {
      deleteChannel(c, (data) => {
        list = list.filter((chan) => chan.id !== c.id);
      });
    });

    setCurrentList(list);
    toast(`Deleted channels`);

    setSelections([]);
  };

  const handleDeletion = (channel) => {
    selections.length > 1 ? handleDeleteMultipleChannels() : handleDeleteSingleChannel(channel);
  };

  const handleMultiSelect = (channel, i) => {
    const start = flatIndex.findIndex((c) => c.id === selections[selections.length - 1].id);
    const end = i;
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
                      {/* {isDeleting ? (
                        <Button icon="trash" intent="danger" onClick={() => handleDeleteSingleChannel(channel)}>
                          Confirm
                        </Button>
                      ) : (
                        <Button icon="trash" onClick={() => setIsDeleting(true)} />
                      )} */}
                      <Button icon="trash" onClick={() => handleDeletion(channel)} />
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
