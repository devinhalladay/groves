import { Icon, MenuItem } from '@blueprintjs/core';

const TagOption = (tag, { handleClick, modifiers, isTagSelected }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <MenuItem
      active={modifiers.active}
      key={tag.id}
      labelElement={isTagSelected(tag) ? <Icon icon="tick" /> : null}
      onClick={handleClick}
      text={tag.title}
      shouldDismissPopover={false}
    />
  );
};

export default TagOption;
