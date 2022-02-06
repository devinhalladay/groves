import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Button,
  ControlGroup,
  Icon,
  InputGroup,
  Menu,
  MenuItem,
  Navbar,
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import withChannel from '@components/Channel';
import { GET_SKELETON } from '@components/Channel/queries/getSkeleton';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelection } from '~/src/context/selection-context';
import { CREATE_CONNECTION } from '~/src/graphql/mutations';

const ChannelMenuItem = (props) => {
  const { selection, active, onClick } = props;

  return (
    <MenuItem
      active={active}
      icon={active ? 'tick' : 'blank'}
      text={selection.title}
      key={selection.id}
      onClick={onClick}
    />
  );
};

const MergeChannelsAction = (props) => {
  const { selections, setSelections } = useSelection();

  const { deleteChannel } = props;

  const [destination, setDestination] = useState(selections[0]);

  const [mergeList, setMergeList] = useState([]);

  const [connectTo, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_CONNECTION, {
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const [
    getSkeleton,
    { loading: gettingSkeleton, error: errorGettingSkeleton, data: skeleton },
  ] = useLazyQuery(GET_SKELETON, {
    onCompleted: (data) => {
      const { channels } = data;
      const allItems = [];
      channels.forEach((channel) => {
        allItems.push(...channel.skeleton);
      });
      setMergeList(allItems);
    },
  });

  useEffect(() => {
    let ids = [];

    if (selections && destination) {
      selections
        .filter((selection) => selection.id !== destination.id)
        .forEach((channel) => {
          ids.push(channel.id);
        });

      getSkeleton({
        variables: {
          ids: [...ids],
        },
      });
    }
  }, [selections, destination]);

  const handleSafeMerge = () => {
    mergeList.forEach((connectable) => {
      connectTo({
        variables: {
          connectable_id: connectable.id,
          connectable_type: connectable.type.toUpperCase(),
          channel_ids: destination.id,
        },
      });
    });
    setSelections([]);
  };

  const handleDangerousMerge = () => {
    if (mergeList.length) {
      mergeList.forEach((connectable) => {
        connectTo({
          variables: {
            connectable_id: connectable.id,
            connectable_type: connectable.type.toUpperCase(),
            channel_ids: destination.id,
          },
        });
      });
    }

    selections.forEach((channel) => {
      if (channel.id !== destination.id) {
        deleteChannel({
          variables: {
            id: channel.id,
          },
        });
        deleteChannel(channel, (data) => {
          toast(`Deleted channel "${channel.title}"`);
        });
      }
    });

    setSelections([]);
  };

  if (selections.length > 1) {
    return (
      <>
        <Navbar.Divider />
        <Popover2
          position="bottom-right"
          content={
            <section style={{ padding: 15, width: 450, paddingTop: 25 }}>
              <p style={{ marginBottom: 15 }}>
                <span style={{ paddingRight: 6 }}>
                  <Icon icon="git-merge" />
                </span>
                <strong>Merging {selections.length} channels</strong>
              </p>
              <ControlGroup
                vertical={true}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 15,
                }}
              >
                <InputGroup
                  disabled={true}
                  large={true}
                  fill={true}
                  value={`Merge ${selections.length - 1} of ${
                    selections.length
                  } channels into`}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                  className="merge-input-disabled"
                />
                <Popover2
                  position="bottom"
                  fill={true}
                  captureDismiss={true}
                  content={
                    <Menu fill={true} large={true}>
                      {selections.map((selection, i) => (
                        <ChannelMenuItem
                          key={i}
                          selection={selection}
                          active={
                            destination
                              ? destination.id === selection.id
                              : selection.id === selections[0].id
                          }
                          onClick={() => setDestination(selection)}
                        />
                      ))}
                    </Menu>
                  }
                >
                  <Button
                    large={true}
                    // minimal={true}
                    fill={true}
                    rightIcon="caret-down"
                    // intent="primary"
                    style={{ textOverflow: 'ellipsis' }}
                  >
                    {destination ? destination.title : selections[0].title}
                  </Button>
                </Popover2>
              </ControlGroup>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  large={true}
                  icon="remove"
                  intent="danger"
                  onClick={handleDangerousMerge}
                >
                  Merge and delete
                </Button>

                <Button
                  large={true}
                  icon="git-merge"
                  intent="primary"
                  onClick={handleSafeMerge}
                >
                  Safe merge
                </Button>
              </div>
            </section>
          }
        >
          <Button className="action" minimal={true}>
            <Icon icon="git-merge" />
          </Button>
        </Popover2>
      </>
    );
  }

  return null;
};

export default withChannel()(MergeChannelsAction);
