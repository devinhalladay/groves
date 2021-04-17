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
import { IconNames } from '@blueprintjs/icons';
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

const SelectionPanel = React.memo((props) => {
  const router = useRouter();
  const { apollo } = props;
  const { selectedConnection, setSelectedConnection } = useSelection();

  if (selectedConnection) {
    const { index } = useUser();

    const query = selectedConnection.__typename === 'Channel' ? SELECTED_CHANNEL : SELECTED_BLOCK;

    const [tagState, setTagState] = useState({
      tags: selectedConnection.current_user_channels
        .map((chanel) => chanel)
        .filter((channel) => channel.id !== parseInt(router.query.grove))
    });

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

    const [createChannel, { loading: creatingChannel, error: errorCreatingChannel }] = useMutation(
      CREATE_CHANNEL,
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

    const [isExpanded, setIsExpanded] = useState(false);

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
      return tagState.tags.indexOf(tag);
    };

    const isTagSelected = (tag) => {
      return getSelectedTagIndex(tag) !== -1;
    };

    const selectTag = (tag) => {
      selectTags([tag]);
    };

    const selectTags = (tagsToSelect) => {
      const { tags } = tagState;

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
      });

      setTagState({
        tags: nextTags
        // items: nextItems
      });
    };

    const flatItems = index.flatMap((channelSet) => channelSet.channels.flatMap((c) => c));

    let deselectTag = (tag) => {
      const { tags } = tagState;

      // Delete the item if the user manually created it.
      setTagState({
        tags: tags.filter((t) => t.id !== tag.id)
      });

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
      } else {
        await createChannel({
          variables: {
            title: tag.title
          }
        }).then((data) => {
          console.log('data');
          console.log(data.data.create_channel.channel);
          selectTag(data.data.create_channel.channel);
        });
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

    const createNewTagFromQuery = (query) => {
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
        // boundary="scrollParent"
        usePortal={false}>
        <div
          style={{
            width: 16,
            height: 16,
            marginTop: 5,
            marginRight: 5
          }}>
          <Icon icon={IconNames.INFO_SIGN} />
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
                  icon={IconNames.LINK}
                  style={{ marginRight: 10 }}>
                  Source
                </AnchorButton>
              )}
              <AnchorButton
                href={`https://are.na${selectedConnection.href}`}
                icon={<img src="/open.svg" alt="" />}>
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
              defaultValue={
                selectedConnection &&
                selectedConnection.description &&
                parse(`${selectedConnection.description}`)
              }
            />
          </div>
          <div className="section">
            <div className="section__title">Tags</div>
            <MultiSelect
              className="position-relative"
              createNewItemFromQuery={createNewTagFromQuery}
              createNewItemRenderer={createNewTagRenderer}
              selectedItems={tagState.tags}
              itemPredicate={filterTags}
              itemRenderer={renderTagOption}
              popoverProps={{
                minimal: true,
                style: {
                  width: 300
                },
                fill: true
              }}
              // itemsEqual={areFilmsEqual}
              // we may customize the default filmSelectProps.items by
              // adding newly created items to the list, so pass our own
              items={flatItems}
              noResults={<MenuItem disabled={true} text="No results." />}
              onItemSelect={handleTagSelect}
              onRemove={handleTagRemove}
              fill={true}
              // onItemsPaste={this.handleFilmsPaste}
              // popoverProps={{ minimal: true,  }}
              tagRenderer={renderTag}
              tagInputProps={{
                // onRemove: handleTagRemove,
                rightElement: explainElement(),
                leftIcon: IconNames.TAG,
                tagProps: {
                  minimal: true
                }
              }}
              selectedItems={tagState.tags}
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

export default SelectionPanel;
