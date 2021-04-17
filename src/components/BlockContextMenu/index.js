import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";
import { Icons } from "@blueprintjs/icons";
import Formations from "~/src/constants/Formations";
import { useSelection } from "~/src/context/selection-context";

const BlockContextMenu = (props) => {
  const {
    setSelectedConnection,
    canvasBlocks,
    setCanvasBlocks
  } = useSelection();

  const removeFromCanvas = () => {
    setCanvasBlocks(canvasBlocks.filter((b) => b.id !== props.block.id));
  };

  return (
    <ContextMenu
      content={
        <Menu>
          {props.formation.key === Formations.GRID.key ? (
            <MenuItem
              icon='send-to'
              onClick={props.handleBlockClick}
              text="Add to canvas"
            />
          ) : (
            <MenuItem
              icon='remove'
              onClick={removeFromCanvas}
              text="Remove from canvas"
            />
          )}
          <MenuItem
            icon='trash'
            onClick={props.handleBlockClick}
            text="Delete connection"
          />
        </Menu>
      }>
      {props.children}
    </ContextMenu>
  );
};

export default BlockContextMenu;