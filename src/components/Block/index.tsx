import { Blokk_blokk } from 'ervell/src/__generated__/Blokk';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '~/src/types';

import { Node, NodeView, ToolsView } from '@antv/x6';
import { Card, Menu, MenuItem } from '@blueprintjs/core';
import { ContextMenu2 } from '@blueprintjs/popover2';

import BlockRepresentation from './components/BlockRepresentation';

// TODO: Need to break up this component, it's all kinds of fucked up
// and recursively renders itself via InlineExpandedChannel which
// feels bad and makes it hard to keep track of props

export interface ContextMenuToolOptions extends ToolsView.ToolItem.Options {
  menu: React.ReactElement;
}

const ContextMenuTool: ToolsView.ToolItem<
  NodeView,
  ContextMenuToolOptions
> = () => {};

interface DraggableBlock {
  block?: Blokk_blokk;
  width: number;
  height: number;
  channelId?: string;
  node: Node;
  handleRemoveConnection: (node: Node, block: Ervell.Blokk_blokk) => void;
}

const DraggableBlock = ({
  block,
  width,
  height,
  channelId,
  node,
  handleRemoveConnection,
  ...props
}: DraggableBlock) => {
  let description;

  if (!block)
    return (
      <Card
        // onClick={() => handleSelect(block)}
        interactive={true}
        className={`draggable-block-container w-full h-full`}
      >
        <div
          className={`block block--text`}
          onScroll={(e) => e.stopPropagation()}
        >
          <p>Whoa! How'd I get here?</p>
        </div>
      </Card>
    );

  if (block?.description && block.description.includes('"x":')) {
    description = JSON.parse(block.description.replace('\n', ''));
  }

  return (
    <ContextMenu2
      onContextMenu={(e) => {
        console.log(block);
      }}
      content={
        <Menu>
          <MenuItem text="Save" />
          <MenuItem text="Save as..." />
          <MenuItem
            text="Delete..."
            intent="danger"
            onClick={() => {
              handleRemoveConnection(node, block);
            }}
          />
        </Menu>
      }
      className="w-full h-full"
    >
      <Card
        interactive={true}
        className={`draggable-block-container w-full h-full ${
          block.__typename ? block.__typename : ''
        } `}
      >
        <div
          className={`block block--${block.__typename.toLowerCase()}`}
          onScroll={(e) => e.stopPropagation()}
        >
          {block.__typename === 'Channel' && (
            <button className="icon-button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 13L12.9995 13V8"
                  stroke="#BDC3CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.99951 3L3 3L3 8.00001"
                  stroke="#BDC3CA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <BlockRepresentation block={block} />
        </div>
      </Card>
    </ContextMenu2>
  );
};

export default DraggableBlock;
