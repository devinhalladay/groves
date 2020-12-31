import { useMutation, useQuery } from '@apollo/client';
import { EditableText, Intent, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import Loading from '~/src/components/Loader';
import { useSelection } from '@context/selection-context';
import { SELECTED_BLOCK, SELECTED_CHANNEL } from '~/src/queries';
import { UPDATE_CONNECTION, UPDATE_CHANNEL } from '~/src/mutations';
import { Router } from 'next/router';
import { useUser } from '~/src/context/user-context';

const SelectionPanel = React.memo((props) => {
  const { apollo } = props;
  const { selectedConnection, setSelectedConnection } = useSelection();
  const { index } = useUser();

  const query = selectedConnection.__typename === 'Channel' ? SELECTED_CHANNEL : SELECTED_BLOCK;

  const [tagState, setTagState] = useState({
    tags: []
  });

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
    tag.title;
  };

  const renderTagOption = (tag, { modifiers, handleClick }) => (
    <MenuItem
      active={modifiers.active}
      // icon={this.isFilmSelected(film) ? 'tick' : 'blank'}
      key={tag.id}
      label={tag.title}
      onClick={handleClick}
      text={tag.title}
      shouldDismissPopover={false}
    />
  );

  const handleTagRemove = (tag, index) => {
    deselectTag(index);
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
    });

    setTagState({
      tags: nextTags
      // items: nextItems
    });
  };

  let deselectTag = (index) => {
    const { tags } = tagState;

    // Delete the item if the user manually created it.
    setTagState({
      tags: tags.filter((_tag, i) => i !== index)
    });
  };

  const handleTagSelect = (tag) => {
    if (!isTagSelected(tag)) {
      selectTag(tag);
    } else {
      deselectTag(getSelectedTagIndex(tag));
    }
  };

  const { data, loading, error, networkStatus } = useQuery(query, {
    // notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    variables: {
      id: selectedConnection.id
    }
  });

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
            // createNewItemFromQuery={maybeCreateNewItemFromQuery}
            // createNewItemRenderer={maybeCreateNewItemRenderer}
            // initialContent={initialContent}
            itemRenderer={renderTagOption}
            // itemsEqual={areFilmsEqual}
            // we may customize the default filmSelectProps.items by
            // adding newly created items to the list, so pass our own
            items={index.flatMap((channelSet) => channelSet.channels.flatMap((c) => c))}
            noResults={<MenuItem disabled={true} text="No results." />}
            onItemSelect={handleTagSelect}
            fill={true}
            // onItemsPaste={this.handleFilmsPaste}
            // popoverProps={{ minimal: true }}
            tagRenderer={renderTag}
            tagInputProps={{
              onRemove: handleTagRemove,
              // rightElement: clearButton,
              tagProps: {
                minimal: true
              }
            }}
            selectedItems={tagState.tags}
          />
        </div>
        {selectedConnection.current_user_channels.length !== 0 && (
          <div className="section">
            <p className="section__title">Connected to</p>
            <ul>
              {selectedConnection &&
                selectedConnection.current_user_channels.map((channel) => (
                  <li key={channel.id}>
                    <a href={`${channel.href}`}>{channel.title}</a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});

export default SelectionPanel;
