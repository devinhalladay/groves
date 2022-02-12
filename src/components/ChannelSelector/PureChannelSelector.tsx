import React from 'react';

import { Icon, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';

import { Ervell } from '../../types';
import withChannel from '../Channel';
import ExplainTooltip from '../SelectionPanel/components/ExplainTooltip';
import NewItem from './NewItem';

const PureChannelSelector = ({
  isTagSelected,
  createNewTagFromQuery,
  handleCreateChannel,
  filterTags,
  flatIndex,
  handleTagSelect,
}) => {
  const renderTag: ItemRenderer<Ervell.ConnectableTableBlokk_blokk_Channel> = (
    tag,
    { modifiers, handleClick },
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={tag.id}
        labelElement={
          !!isTagSelected && isTagSelected(tag) ? <Icon icon="tick" /> : null
        }
        onClick={handleClick}
        text={tag.title}
        shouldDismissPopover={false}
      />
    );
  };

  return (
    <div>
      <MultiSelect
        className="position-relative"
        createNewItemFromQuery={createNewTagFromQuery && createNewTagFromQuery}
        createNewItemRenderer={(query, active) => (
          <NewItem
            active={active}
            query={query}
            handleCreateChannel={handleCreateChannel && handleCreateChannel}
          />
        )}
        // selectedItems={tagState.tags}
        itemPredicate={filterTags && filterTags}
        itemRenderer={renderTag}
        fill={true}
        popoverProps={{
          minimal: true,
          fill: true,
        }}
        items={flatIndex}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={handleTagSelect && handleTagSelect}
        tagRenderer={() => {
          return {};
        }}
        tagInputProps={{
          rightElement: (
            <div
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
              }}
            >
              <ExplainTooltip />
            </div>
          ),
          leftIcon: 'add',
          tagProps: {
            minimal: true,
          },
        }}
        // selectedItems={tagState.tags}
        resetOnSelect={true}
      />
    </div>
  );
};

export default withChannel()(PureChannelSelector);
