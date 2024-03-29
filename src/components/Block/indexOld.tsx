import { Card } from '@blueprintjs/core';
import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import useSegment from '~/src/hooks/useSegment';
import { getMovementDirection } from '~/src/utils/block';
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
import { Blokk_blokk } from 'ervell/src/__generated__/Blokk';
import { dragStates } from '~/src/types';

// TODO: Need to break up this component, it's all kinds of fucked up
// and recursively renders itself via InlineExpandedChannel which
// feels bad and makes it hard to keep track of props

interface DraggableBlock {
  block: Blokk_blokk;
  width: number;
  height: number;
  dragStates: dragStates;
  setDragStates: React.Dispatch<React.SetStateAction<dragStates>>;
  parentDimensions: {
    width: number;
    height: number;
  };
  dragHandleClassName: string;
}

const DraggableBlock = ({
  block,
  width,
  height,
  dragStates,
  setDragStates,
  parentDimensions,
  dragHandleClassName,
  ...props
}) => {
  let description;
  let { staticBlock } = props;

  const { selectedConnection, setSelectedConnection } = useSelection();
  const { workspaceOptions, zoomScale, setCanvasBlocks } = useWorkspace();
  const { formation } = workspaceOptions;
  const { analytics } = useSegment();

  if (block.description && block.description.includes('"x":')) {
    description = JSON.parse(block.description.replace('\n', ''));
  }

  const [spatialState, setSpatialState] = useState({
    zIndex: dragStates.maxZIndex,
    isExpanded: false,
    draggingEnabled: true,
    dragHandle: dragHandleClassName,
    x: (() => {
      if (description) {
        return description.x;
      } else {
        return Math.random(window.innerWidth) * window.innerWidth;
      }
    }).call(),
    y: (() => {
      if (description) {
        return description.y;
      } else if (parentDimensions) {
        return Math.random(parentDimensions.height) * parentDimensions.height;
      } else {
        return Math.random(window.innerHeight) * window.innerHeight;
      }
    }).call(),
    width: width || 200,
    height: height || 200,
    isBeingDragged: false,
    cursor: {
      movementDirection: {},
      cursorPosition: {},
      edgeSize: 20,
      edgeTop: 20,
      edgeLeft: 20,
      edgeBottom: 20,
      edgeRight: 20,
      isInLeftEdge: false,
      isInRightEdge: false,
      isInTopEdge: false,
      isInBottomEdge: false,
    },
  });

  const rndEl = useRef(null);

  let handleDragMetric = () => {
    analytics?.track('Dragged Block');
  };

  // Open a channel transclusion
  const expandChannelInline = () => {
    setSpatialState({
      ...spatialState,
      isExpanded: true,
      width: 400,
      height: 300,
    });
  };

  // Close a channel transclusion
  const retractChannelInline = () => {
    setSpatialState({
      ...spatialState,
      isExpanded: false,
    });
  };

  // Dismiss a transclusion
  const dismissInlineChannel = () => {
    setSpatialState({
      ...spatialState,
      isExpanded: false,
      width: 200,
      height: 200,
    });
  };

  // Render a transclusion
  const renderChannelInline = () => {
    return (
      <InlineExpandedChannel
        channel={block}
        dragStates={dragStates}
        setDragStates={setDragStates}
        setSpatialState={setSpatialState}
        spatialState={spatialState}
        dismissInlineChannel={dismissInlineChannel}
        parentDimensions={{
          width: spatialState.width,
          height: spatialState.height,
        }}
        {...props}
      />
    );
  };

  // Handle the drag start
  const handleDragStart = (e) => {
    setDragStates({
      ...dragStates,
      maxZIndex: dragStates.maxZIndex + 1,
    });
    setSpatialState({ ...spatialState, zIndex: dragStates.maxZIndex });
    if (spatialState.isBeingDragged) {
      setSpatialState({ ...spatialState, isBeingDragged: true });
    } else {
      return false;
    }
  };

  // Handle movement while dragging
  const handleDrag = (e, d) => {
    setSpatialState({
      ...spatialState,
      isBeingDragged: !(d.x < 5 && d.y < 5),
      cursor: {
        ...spatialState.cursor,
        movementDirection: getMovementDirection(e, d),
        cursorPosition: cursorPositionInViewport(e),
        edgeBottom: viewportDimensions().height - spatialState.cursor.edgeSize,
        edgeRight: viewportDimensions().width - spatialState.cursor.edgeSize,
        isInLeftEdge:
          spatialState.cursor.cursorPosition.x < spatialState.cursor.edgeLeft,
        isInRightEdge:
          spatialState.cursor.cursorPosition.x > spatialState.cursor.edgeRight,
        isInTopEdge:
          spatialState.cursor.cursorPosition.y < spatialState.cursor.edgeTop,
        isInBottomEdge:
          spatialState.cursor.cursorPosition.y > spatialState.cursor.edgeBottom,
      },
    });

    if (shouldScrollAtEdge(spatialState.cursor, e)) {
      adjustWindowScroll(spatialState.cursor);
    }
  };

  // Handle the end of the drag movement
  const handleDragStop = (e, d) => {
    if (spatialState.isBeingDragged) {
      setSpatialState({
        ...spatialState,
        isBeingDragged: false,
        x: d.x,
        y: d.y,
      });

      handleDragMetric();
    } else {
      if (!staticBlock) {
        setSelectedConnection({
          ...block,
        });
      }
    }
  };

  // Handle resizing on the corners of a block
  const handleResize = (delta) => {
    if (block.__typename === 'Channel') {
      if (delta.width > 0 || delta.height > 0) {
        if (
          spatialState.width + delta.width >= 500 &&
          spatialState.height + delta.height >= 400 &&
          spatialState.isExpanded == false
        ) {
          expandChannelInline();
        }
      }

      if (delta.width < 0 || delta.height < 0) {
        if (
          spatialState.width + delta.width <= 500 &&
          spatialState.height + delta.height <= 400 &&
          spatialState.isExpanded == true
        ) {
          retractChannelInline();
        }
      }
    }
  };

  // Handle the end of a resize event
  const handleResizeStop = (delta) => {
    setSpatialState({
      ...spatialState,
      width: spatialState.width + delta.width,
      height: spatialState.height + delta.height,
    });
  };

  return (
    <BlockContextMenu
      key={block.id}
      block={block}
      formation={formation}
      handleBlockClick={(e) => {
        handleBlockClick(e, canvasBlocks, value, setCanvasBlocks);
      }}
    >
      <Rnd
        ref={rndEl}
        key={block.id}
        size={{ width: spatialState.width, height: spatialState.height }}
        scale={zoomScale}
        maxWidth="100%"
        position={{
          x: spatialState.x,
          y: spatialState.y,
        }}
        onDragStart={(e) => {
          handleDragStart(e);
        }}
        // disableDragging={spatialState.isExpanded}
        bounds={'window'}
        onDrag={(e, d) => {
          handleDrag(e, d);
        }}
        onDragStop={(e, d) => {
          handleDragStop(e, d);
        }}
        dragHandleClassName={spatialState.isExpanded ? 'header' : null}
        // TODO: Figure out how to set bounds for DraggableBlocks that are expanded channels
        // Might actually make more sense to completely refactor the block rendering
        // logic, since a good chunk of the work moving forward will rely on it being solid.

        onResize={(e, direction, ref, delta, position) => {
          handleResize(delta);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          handleResizeStop(delta);
        }}
        style={{
          zIndex: spatialState.zIndex,
        }}
      >
        <Card
          onClick={() => console.log('test')}
          interactive={true}
          className={`draggable-block-container ${
            block.__typename ? block.__typename : ''
          } ${
            selectedConnection && selectedConnection.id
              ? block.id === selectedConnection.id
                ? 'selected'
                : ''
              : ''
          } ${
            spatialState.isExpanded ? 'draggable-block-container--expanded' : ''
          } ${spatialState.isBeingDragged ? 'isBeingDragged' : ''}`}
        >
          {spatialState.isExpanded ? (
            renderChannelInline()
          ) : (
            <div
              className={`block block--${block.__typename.toLowerCase()}`}
              onScroll={(e) => e.stopPropagation()}
            >
              {block.__typename === 'Channel' && (
                <button className="icon-button" onClick={expandChannelInline}>
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
          )}
        </Card>
      </Rnd>
    </BlockContextMenu>
  );
};

export default DraggableBlock;
