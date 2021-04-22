import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";

const CanvasContextMenu = (props) => {
  const addNewBlock = () => {
    console.log('new block added');
  }

  return (
    <ContextMenu
      content={
        <Menu>
            <MenuItem
              icon='create-object'
              onClick={addNewBlock}
              text="Add a block"
            />
        </Menu>
      }>
      {props.children}
    </ContextMenu>
  )
}

export default CanvasContextMenu