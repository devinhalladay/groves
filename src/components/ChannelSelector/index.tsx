import { useRouter } from 'next/router';
import React from 'react';

import { Icon, Intent, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';

import { useSelection } from '../../context/selection-context';
import { useUser } from '../../context/user-context';
import { Ervell } from '../../types';
import withChannel from '../Channel';
import ExplainTooltip from '../SelectionPanel/components/ExplainTooltip';
import { useConnectionMutation } from '../SelectionPanel/mutations';
import NewItem from './NewItem';
import useToast from '../useToast';

function ChannelSelector({ createChannel }) {
  const { selectedConnection, setSelectedConnection } = useSelection();
  const router = useRouter();
  const { createConnection, removeConnection } = useConnectionMutation();
  const { index, flatIndex } = useUser();

  console.log(flatIndex);

  const { showToast } = useToast();
  const filterTags = (query, tag) => {
    const text = `${tag.title}`;
    return text.toLowerCase().indexOf(query.toLowerCase()) >= 0;
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

    tagsToSelect.forEach((tag) => {
      nextTags = !nextTags.includes(tag) ? [...nextTags, tag] : nextTags;

      createConnection({
        variables: {
          connectable_id: selectedConnection.id,
          connectable_type: 'BLOCK',
          channel_ids: [tag.id],
        },
      });
    });
  };

  let deselectTag = (tag) => {
    let selected = selectedConnection;
    selected.current_user_channels = selected.current_user_channels.filter(
      (t) => t.id !== tag.id,
    );
    setSelectedConnection(selected);

    removeConnection({
      variables: {
        connectable_id: selectedConnection.id,
        connectable_type: 'BLOCK',
        channel_id: tag.id,
      },
    });
  };

  const handleTagSelect = async (tag) => {
    if (flatIndex.filter((t) => t.title == tag.title).length > 0) {
      if (!isTagSelected(tag)) {
        selectTag(tag);
      } else {
        handleTagRemove(tag);
        console.log(selectedConnection);
      }
    }
  };

  const handleTagRemove = (tag) => {
    deselectTag(tag);
  };

  const handleCreateChannel = async (title) => {
    await createChannel(
      { title: title },
      (data) => {
        // let selected = selectedConnection;
        // selected = [
        //   ...selected.current_user_channels,
        //   {
        //     title: title,
        //   },
        // ];

        // setSelectedConnection(selected);
        showToast({
          message: `Created channel: ${title}`,
          intent: Intent.SUCCESS,
          icon: 'tick',
        });
      },
      (error) => {
        console.log(error);

        showToast({
          message: error,
          intent: Intent.DANGER,
        });
      },
    );
  };

  const createNewTagFromQuery = async (query) => {
    console.log(query);

    if (selectedConnection?.currentUserChannels) {
      await createChannel(
        { title: query },
        (data) => {
          console.log(data);
        },
        (error) => console.log(error),
      )
        .then((result) => {
          let selected = selectedConnection;

          selected.currentUserChannels.push({
            title: query,
          });

          setSelectedConnection(selected);

          showToast({
            message: `Created channel: ${query}`,
          });
        })
        .catch((err) => {});
    }

    return {
      title: query,
    };
  };

  const renderTag = (item, { handleClick, modifiers, query }) => {
    return (
      <MenuItem
        key={item.id}
        onClick={handleClick}
        text={item.title}
        shouldDismissPopover={false}
      />
    );
  };

  return (
    <MultiSelect
      createNewItemFromQuery={() => null}
      createNewItemRenderer={(query, active, handleClick) => (
        <MenuItem
          icon="add"
          text={`Create "${query}"`}
          active={active}
          // onClick={handleClick}
          onClick={() => handleCreateChannel(query)}
          shouldDismissPopover={true}
        />
      )}
      placeholder="Search or create a channel"
      itemPredicate={filterTags}
      itemRenderer={renderTag}
      fill={true}
      popoverProps={{
        minimal: true,
        fill: true,
      }}
      items={flatIndex}
      noResults={<MenuItem disabled={true} text="No results." />}
      onItemSelect={handleTagSelect}
      tagRenderer={(item) => item.title}
      tagInputProps={{
        tagProps: {
          minimal: true,
        },
      }}
      resetOnSelect={true}
    />
  );
}

export default withChannel()(ChannelSelector);
