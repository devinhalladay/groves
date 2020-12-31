import { useMutation, useQuery } from '@apollo/client';
import { EditableText, Icon, Intent, MenuItem, Position } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import Loading from '~/src/components/Loader';
import { useSelection } from '@context/selection-context';
import { SELECTED_BLOCK, SELECTED_CHANNEL } from '~/src/queries';
import {
  UPDATE_CONNECTION,
  UPDATE_CHANNEL,
  CREATE_CONNECTION,
  REMOVE_CONNECTION,
  CREATE_CHANNEL
} from '~/src/mutations';
import { Router, useRouter } from 'next/router';
import { useUser } from '~/src/context/user-context';

const SelectionPanel = React.memo((props) => {
  const router = useRouter();
  const { apollo } = props;
  const { selectedConnection, setSelectedConnection } = useSelection();
  const { index } = useUser();

  const query = selectedConnection.__typename === 'Channel' ? SELECTED_CHANNEL : SELECTED_BLOCK;

  const [tagState, setTagState] = useState({
    tags: selectedConnection.current_user_channels.map((channel) => channel)
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

  const [
    createChannel,
    { loading: creatingChannel, error: errorCreatingChannel }
  ] = useMutation(CREATE_CHANNEL, {
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

  const handleTagSelect = (tag) => {
    if (!isTagSelected(tag)) {
    selectTag(tag);
    } else {
      handleTagRemove(tag)
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
        labelElement={isTagSelected(tag) ? <Icon icon='tick' /> : null}
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
    return createChannel({
      variables: {
        title: query.toString()
      }
    });
  }

  const createNewTagRenderer = (query, active, handleClick) => (
    <MenuItem
      icon="add"
      text={`Create "${query}"`}
      active={active}
      onClick={handleClick}
      shouldDismissPopover={false}
    />
  );

  if (loading) {
    return (
      <div className="selection-panel">
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
      className="selection-panel"
      style={{
        right: selectedConnection !== null ? '15px' : '-315px'
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
          <p
            style={{
              marginRight: 40,
              fontSize: 18,
              width: '100%'
            }}>
            <EditableText
              onChange={(e) => handleTitleChange(e, selectedConnection)}
              fill={true}
              autoFocus
              intent={Intent.PRIMARY}
              maxLength={45}
              placeholder="Edit title..."
              defaultValue={selectedConnection.title}
              selectAllOnFocus={true}
            />
          </p>
          <p className="small"></p>
          <p className="meta small">{selectedConnection.__typename}</p>
          <p className="meta small">
            {`Added ${selectedConnection.created_at} by ${selectedConnection.user.name}`}
          </p>
          <a
            style={{
              position: 'absolute',
              top: 0,
              right: 0
            }}
            href={`https://are.na${selectedConnection.href}`}
            target="_blank"
            rel="noreferrer">
            <img src="/open.svg" alt="" />
          </a>
        </div>
        <div className="section">
          <p className="section__title">Description</p>
          <EditableText
            intent={Intent.PRIMARY}
            maxLines={24}
            minLines={2}
            className="description-field"
            onChange={(e) => handleDescriptionChange(e, selectedConnection)}
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
            createNewItemFromQuery={createNewTagFromQuery}
            createNewItemRenderer={createNewTagRenderer}
            selectedItems={tagState.tags}
            itemPredicate={filterTags}
            itemRenderer={renderTagOption}
            popoverProps={{
              className: 'testset',
              minimal: true,
              boundary: 'clippingParents',
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
              // rightElement: clearButton,
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
});

export default SelectionPanel;
