import { useMutation, useQuery } from '@apollo/client';
import {
  AnchorButton,
  Button,
  EditableText,
  Icon,
  Intent,
  MenuItem,
  Tooltip
} from '@blueprintjs/core';
import { Icons } from '@blueprintjs/icons';
import { MultiSelect } from '@blueprintjs/select';
import { useSelection } from '@context/selection-context';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Loading from '~/src/components/Loader';
import { useUser } from '~/src/context/user-context';
import {
  CREATE_CHANNEL,
  CREATE_CONNECTION,
  REMOVE_CONNECTION,
  UPDATE_CHANNEL,
  UPDATE_CONNECTION
} from '~/src/graphql/mutations';
import { SELECTED_BLOCK, SELECTED_CHANNEL } from '~/src/graphql/queries';
import ChevronDown from '~/public/chevron-down.svg';
import ChevronUp from '~/public/chevron-up.svg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import withChannel from '../Channel';

const SelectionPanel = React.memo((props) => {
  const router = useRouter();
  const { apollo, createChannel } = props;
  const { selectedConnection, setSelectedConnection } = useSelection();

  const handleCreateChannel = async (title) => {
    await createChannel(
      { title: title },
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (selectedConnection) {
    const { index } = useUser();

    const query = selectedConnection.__typename === 'Channel' ? SELECTED_CHANNEL : SELECTED_BLOCK;

    // const [tagState, setTagState] = useState({
    //   tags: selectedConnection.current_user_channels
    //     .map((chanel) => chanel)
    //     .filter((channel) => channel.id !== parseInt(router.query.grove))
    // });

    const filterTags = (query, tag) => {
      const text = `${tag.title}`;
      return text.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };

    const [
      updateConnection,
      { loading: updatingConnection, error: errorUpdatingConnection }
    ] = useMutation(UPDATE_CONNECTION, {
      client: apollo,
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    });

    const [
      createConnection,
      { loading: creatingConnection, error: errorCreatingConnection }
    ] = useMutation(CREATE_CONNECTION, {
      client: apollo,
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    });

    const [
      removeConnection,
      { loading: removingConnection, error: errorRemovingConnection }
    ] = useMutation(REMOVE_CONNECTION, {
      client: apollo,
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    });

    const [updateChannel, { loading: updatingChannel, error: errorUpdatingChannel }] = useMutation(
      UPDATE_CHANNEL,
      {
        client: apollo,
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        }
      }
    );

    const [isExpanded, setIsExpanded] = useState(true);

    const handleTitleChange = (e, connectable) => {
      if (connectable.__typename === 'Channel') {
        updateChannel({
          variables: {
            id: connectable.id,
            title: e
          }
        });
      } else {
        updateConnection({
          variables: {
            connectable_id: connectable.id,
            title: e
          }
        });
      }
    };

    const handleDescriptionChange = (e, connectable) => {
      if (connectable.__typename === 'Channel') {
        updateChannel({
          variables: {
            id: connectable.id,
            description: e
          }
        });
      } else {
        updateConnection({
          variables: {
            connectable_id: connectable.id,
            description: e
          }
        });
      }
    };

    const renderTag = (tag) => {
      return tag.title;
    };

    const getSelectedTagIndex = (tag) => {
      return selectedConnection.current_user_channels.indexOf(tag);
    };

    const isTagSelected = (tag) => {
      return getSelectedTagIndex(tag) !== -1;
    };

    const selectTag = (tag) => {
      selectTags([tag]);
    };

    const selectTags = (tagsToSelect) => {
      const tags = selectedConnection.current_user_channels;

      let nextTags = tags.slice();
      // let nextItems = items.slice();

      tagsToSelect.forEach((tag) => {
        // const results = nextItems;
        // nextItems = results.items;
        // Avoid re-creating an item that is already selected (the "Create
        // Item" option will be shown even if it matches an already selected
        // item).
        nextTags = !nextTags.includes(tag) ? [...nextTags, tag] : nextTags;

        createConnection({
          variables: {
            connectable_id: selectedConnection.id,
            connectable_type: 'BLOCK',
            channel_ids: [tag.id]
          }
        });

        let selected = selectedConnection;
        console.log(selectedConnection);
        selected.current_user_channels.push({
          title: tag.title
        });

        setSelectedConnection(selected);
      });
    };

    const flatItems = index.flatMap((channelSet) => channelSet.channels.flatMap((c) => c));

    let deselectTag = (tag) => {
      let selected = selectedConnection;
      selected.current_user_channels = selected.current_user_channels.filter(
        (t) => t.id !== tag.id
      );
      setSelectedConnection(selected);

      removeConnection({
        variables: {
          connectable_id: selectedConnection.id,
          connectable_type: 'BLOCK',
          channel_id: tag.id
        }
      });
    };

    const handleTagSelect = async (tag) => {
      if (flatItems.filter((t) => t.title == tag.title).length > 0) {
        if (!isTagSelected(tag)) {
          selectTag(tag);
        } else {
          handleTagRemove(tag);
        }
      }
    };

    const handleTagRemove = (tag) => {
      deselectTag(tag);
    };

    const renderTagOption = (tag, { handleClick, modifiers, query }) => {
      if (!modifiers.matchesPredicate) {
        return null;
      }
      return (
        <MenuItem
          active={modifiers.active}
          // icon={isTagSelected(tag) ? 'tick' : 'blank'}
          key={tag.id}
          // label={tag.title}
          labelElement={isTagSelected(tag) ? <Icon icon="tick" /> : null}
          onClick={handleClick}
          text={tag.title}
          shouldDismissPopover={false}
        />
      );
    };

    const { data, loading, error, networkStatus } = useQuery(query, {
      // notifyOnNetworkStatusChange: true,
      fetchPolicy: 'no-cache',
      variables: {
        id: selectedConnection.id
      }
    });

    const createNewTagFromQuery = async (query) => {
      if (selectedConnection && selectedConnection.currentUserChannels) {
        await createChannel(
          { title: query },
          (data) => {
            console.log(data);
          },
          (error) => console.log(error)
        );

        let selected = selectedConnection;

        selected.currentUserChannels.push({
          title: query
        });

        setSelectedConnection(selected);
      }

      return {
        title: query
      };
    };

    const createNewTagRenderer = (query, active, handleClick) => (
      <MenuItem
        icon="add"
        text={`Create "${query}"`}
        active={active}
        onClick={handleClick}
        shouldDismissPopover={false}
      />
    );

    const explainElement = () => (
      <Tooltip
        content="Add tags to connect blocks to an are.na channel! Creating a tag creates a new channel."
        targetProps={{
          width: 16,
          height: 16
        }}
        usePortal={false}>
        <div
          style={{
            width: 16,
            height: 16,
            marginTop: 5,
            marginRight: 5
          }}>
          <Icon icon="info-sign" />
        </div>
      </Tooltip>
    );

    if (loading) {
      return (
        <div
          className="selection-panel"
          style={{
            maxHeight: isExpanded ? 'unset' : '170px'
          }}>
          <div className="header">
            <p className="title">Selection</p>
            <button
              className="icon-button"
              onClick={() => {
                setSelectedConnection(null);
              }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.6211 4.04367L4.62109 12.0437"
                  stroke="#BDC3CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.62109 4.04367L12.6211 12.0437"
                  stroke="#BDC3CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="contents">
            <Loading />
          </div>
        </div>
      );
    } else if (error) {
      console.log(error);
      return error;
    }
    return (
      <div
        className="panel selection-panel"
        style={{
          right: selectedConnection !== null ? '15px' : '-315px',
          maxHeight: isExpanded ? 'unset' : '170px'
        }}>
        <div className="header">
          <p className="title">Selection</p>
          <button
            className="icon-button"
            onClick={() => {
              setSelectedConnection(null);
            }}>
            <svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.6211 4.04367L4.62109 12.0437"
                stroke="#BDC3CA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.62109 4.04367L12.6211 12.0437"
                stroke="#BDC3CA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="contents">
          <div
            className="section"
            style={{
              position: 'relative'
            }}>
            <div className="inline-wrapper">
              <EditableText
                onConfirm={(e) => handleTitleChange(e, selectedConnection)}
                fill={true}
                autoFocus
                intent={Intent.PRIMARY}
                maxLength={45}
                placeholder="Edit title..."
                defaultValue={selectedConnection.title}
                selectAllOnFocus={true}
              />
            </div>
            <p className="meta small">
              {selectedConnection.__typename} •{' '}
              {`${selectedConnection.created_at} by ${selectedConnection.user.name}`}
            </p>
            <div
              style={{
                display: 'flex',
                marginTop: 15
              }}>
              {selectedConnection.source_url && (
                <AnchorButton
                  href={selectedConnection.source_url}
                  icon={Icons.Link}
                  style={{ marginRight: 10 }}>
                  Source
                </AnchorButton>
              )}
              <AnchorButton
                href={`https://are.na${selectedConnection.href}`}
                icon={<img src="/open.svg" alt="" />}
                target="_blank">
                Open in Are.na
              </AnchorButton>
            </div>
          </div>
          <section
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              position: 'absolute',
              bottom: '0.3rem',
              left: '0',
              right: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '10'
            }}>
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.6px',
                color: '#86878a',
                textTransform: 'uppercase'
              }}>
              {isExpanded ? 'Minimize' : 'Expand'}
            </p>
            {isExpanded ? (
              <ChevronUp style={{ color: '#86878a' }} />
            ) : (
              <ChevronDown style={{ color: '#86878a' }} />
            )}
          </section>
          <div className="section">
            <p className="section__title">Description</p>

            {/* <ReactMarkdown skipHtml={true} unwrapDisallowed={true} remarkPlugins={[remarkGfm]}> */}
            <EditableText
              intent={Intent.PRIMARY}
              maxLines={24}
              minLines={2}
              className="description-field"
              onConfirm={(e) => handleDescriptionChange(e, selectedConnection)}
              style={{
                height: 60
              }}
              multiline={true}
              placeholder="Add a description to this block…"
              defaultValue={selectedConnection && selectedConnection.description}
            />
            {/* </ReactMarkdown> */}
          </div>
          <div className="section">
            <div className="section__title">Connected To</div>
            {selectedConnection.current_user_channels &&
              selectedConnection.current_user_channels
                .filter((channel) => channel.id !== parseInt(router.query.grove))
                .map((channel) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 5
                    }}>
                    <span
                      className="bp4-text-overflow-ellipsis"
                      style={{
                        marginRight: 10,
                        flex: 1
                      }}>
                      {channel.title}
                    </span>
                    <Button
                      icon={<Icon icon="cross" />}
                      onClick={() => handleTagRemove({ id: channel.id })}
                      minimal={true}></Button>
                  </div>
                ))}
            <MultiSelect
              className="position-relative"
              createNewItemFromQuery={createNewTagFromQuery}
              createNewItemRenderer={createNewTagRenderer}
              // selectedItems={tagState.tags}
              itemPredicate={filterTags}
              itemRenderer={renderTagOption}
              popoverProps={{
                minimal: true,
                style: {
                  width: 300
                },
                fill: true
              }}
              items={flatItems}
              noResults={<MenuItem disabled={true} text="No results." />}
              onItemSelect={handleTagSelect}
              // onRemove={handleTagRemove}
              fill={true}
              tagRenderer={() => {
                return {};
              }}
              tagInputProps={{
                rightElement: (
                  <div
                    style={{
                      display: 'flex',
                      height: '100%',
                      alignItems: 'center'
                    }}>
                    {explainElement()}
                  </div>
                ),
                leftIcon: 'add',
                tagProps: {
                  minimal: true
                }
              }}
              // selectedItems={tagState.tags}
              resetOnSelect={true}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="panel selection-panel"
        style={{
          right: '15px'
        }}>
        <div className="header">
          <p className="title">Selection</p>{' '}
        </div>
        <div className="contents">
          <div className="section">
            <p className="section__title">Description</p>
            <p>Nothing selected yet</p>
          </div>
        </div>
      </div>
    );
  }
});

export default withChannel()(SelectionPanel);
