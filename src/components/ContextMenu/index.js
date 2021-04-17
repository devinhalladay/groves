import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";
import { ContextMenu2 } from "@blueprintjs/popover2";
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
    // let canvasBlocks = [...this.context.canvasBlocks];
    // var index = canvasBlocks
    //   .map(function (block) {
    //     return block.id;
    //   })
    //   .indexOf(props.block.id);
    // canvasBlocks.splice(index, 1);
    // this.context.setCanvasBlocks([...canvasBlocks]);
    setCanvasBlocks(canvasBlocks.filter((b) => b.id !== props.block.id));
  };

  return (
    <ContextMenu
      content={
        <Menu>
          {props.formation === Formations.GRID ? (
            <MenuItem
              icon={Icons.SendTo}
              onClick={props.handleBlockClick}
              text="Add to canvas"
            />
          ) : (
            <MenuItem
              icon={Icons.Remove}
              onClick={removeFromCanvas}
              text="Remove from canvas"
            />
          )}
          <MenuItem
            icon={Icons.Trash}
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
