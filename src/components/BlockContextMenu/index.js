import { ContextMenu, Divider, Menu, MenuItem } from '@blueprintjs/core';
import { Icons } from '@blueprintjs/icons';
import { useRouter } from 'next/router';
import Formations from '~/src/constants/Formations';
import { useSelection } from '~/src/context/selection-context';

const BlockContextMenu = (props) => {
  const router = useRouter();
  const { setSelectedConnection, canvasBlocks, setCanvasBlocks } = useSelection();

  const removeFromCanvas = () => {
    setCanvasBlocks(canvasBlocks.filter((b) => b.id !== props.block.id));
  };

  return (
    <ContextMenu
      content={
        <Menu>
          {router.query.grove &&
            (props.formation.key === Formations.GRID.key ||
            props.formation.key == Formations.FOLDERS.key ? (
              <MenuItem
                icon="send-to"
                onClick={() => props.handleBlockClick(props.block)}
                text="Add to canvas"
              />
            ) : (
              <MenuItem icon="remove" onClick={removeFromCanvas} text="Remove from canvas" />
            ))}
          <Divider style={{ marginBottom: 10 }} />
          <MenuItem
            style={{ backgroundColor: 'rgb(219 55 56 / 18%)' }}
            intent="danger"
            icon="trash"
            onClick={() => props.handleBlockClick(props.block)}
            text={`Delete ${props.block.__typename}`}
          />
        </Menu>
      }>
      {props.children}
    </ContextMenu>
  );
};

export const handleBlockClick = (event, canvasBlocks, block, setCanvasBlocks) => {
  if (canvasBlocks.some((b) => b.id === block.id)) {
    setCanvasBlocks(canvasBlocks.filter((b) => b.id !== block.id));
  } else {
    setCanvasBlocks(canvasBlocks.concat(block));
  }
};

export default BlockContextMenu;
