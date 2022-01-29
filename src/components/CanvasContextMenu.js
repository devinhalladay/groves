import { Menu, MenuItem } from '@blueprintjs/core';
import { ContextMenu2 } from '@blueprintjs/popover2';

const CanvasContextMenu = (props) => {
  const addNewBlock = () => {
    console.log('new block added');
  };

  return (
    <ContextMenu2
      content={
        <Menu>
          <MenuItem icon="new-object" onClick={addNewBlock} text="Add a block" />
        </Menu>
      }>
      {props.children}
    </ContextMenu2>
  );
};

export default CanvasContextMenu;
