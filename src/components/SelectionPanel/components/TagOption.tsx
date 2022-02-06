import { Icon, MenuItem } from '@blueprintjs/core';
import { ItemRenderer } from '@blueprintjs/select';
import { Ervell } from '~/src/types';

type ITag = Ervell.ConnectableBlokk_blokk_Channel;

const TagOption: ItemRenderer<ITag> = (
  tag: Ervell.ProfileChannelIndex_User_channels_index_channels,
  { handleClick, modifiers, isTagSelected },
) => {
  console.log(modifiers);

  if (!modifiers?.matchesPredicate) {
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
