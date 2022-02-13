import { Blokk_blokk } from 'ervell/src/__generated__/Blokk';
import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import useSegment from '~/src/hooks/useSegment';
import { dragStates } from '~/src/types';
import { getMovementDirection } from '~/src/utils/block';

import { Card } from '@blueprintjs/core';

import { useSelection } from '../../context/selection-context';
import { useWorkspace } from '../../context/workspace-context';
import {
  adjustWindowScroll,
  cursorPositionInViewport,
  shouldScrollAtEdge,
  viewportDimensions,
} from '../../utils/canvas';
import BlockContextMenu, { handleBlockClick } from '../BlockContextMenu';
import InlineExpandedChannel from '../ChannelEmbed';
import BlockRepresentation from './components/BlockRepresentation';

// TODO: Need to break up this component, it's all kinds of fucked up
// and recursively renders itself via InlineExpandedChannel which
// feels bad and makes it hard to keep track of props

interface DraggableBlock {
  block: Blokk_blokk;
  width: number;
  height: number;
}

const DraggableBlock = ({ block, width, height }) => {
  let description;

  // const { selectedConnection, setSelectedConnection } = useSelection();
  // const { workspaceOptions, zoomScale, setCanvasBlocks } = useWorkspace();
  // const { formation } = workspaceOptions;

  if (block.description && block.description.includes('"x":')) {
    description = JSON.parse(block.description.replace('\n', ''));
  }

  return (
    // <BlockContextMenu key={block.id} block={block} formation={formation}>
    <Card
      onClick={() => console.log('test')}
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
    // </BlockContextMenu>
  );
};

export default DraggableBlock;
