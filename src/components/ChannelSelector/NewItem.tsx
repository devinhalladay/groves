import { MenuItem } from '@blueprintjs/core';

const NewItem = ({ query, active, handleCreateChannel }) => {
  return (
    <MenuItem
      icon="add"
      text={`Create "${query}"`}
      active={active}
      onClick={() => handleCreateChannel(query)}
      shouldDismissPopover={false}
    />
  );
};

export default NewItem;
