import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';
import { Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { SelectionContext } from '~/src/context/selection-context';
import React, { Component } from 'react';

const ContextMenu = ContextMenuTarget(
  class RightClickMeWithContext extends Component {
    constructor(props) {
      super(props);
    }

    static contextType = SelectionContext;

    componentDidMount() {
      const workspace = this.context;
      console.log(this.props);
      // console.log(ContextMenuTarget);
    }

    render() {
      // root element must support `onContextMenu`
      return this.props.children;
    }

    // handleAddToCanvas(...props) {
    //   console.log(...props);
    //   this.context.setCanvasBlocks([...this.context.canvasBlocks, props.block]);
    //   // console.log(this.context.canvasBlocks);
    // }

    renderContextMenu() {
      // return a single element, or nothing to use default browser behavior
      return (
        <Menu>
          <MenuItem
            icon={IconNames.SEND_TO}
            onClick={this.props.handleBlockClick}
            text="Add to canvas"
          />
        </Menu>
      );
    }

    onContextMenuClose() {
      // Optional method called once the context menu is closed.
    }
  }
);

export default ContextMenu;
