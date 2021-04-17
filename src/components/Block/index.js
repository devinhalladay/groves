import { useState, useRef, useEffect } from 'react';
import BlockRepresentation from './components/BlockRepresentation';
import { Rnd } from 'react-rnd';
import {
  cursorPositionInViewport,
  viewportDimensions,
  shouldScrollAtEdge,
  adjustWindowScroll
} from '../../utils/canvas';
import InlineExpandedChannel from '../ChannelEmbed';
import { useSelection } from '../../context/selection-context';
import { useAuth } from '../../context/auth-context';
import { useWorkspace } from '../../context/workspace-context';
import { Card, Elevation } from '@blueprintjs/core';
import BlockContextMenu from '../ContextMenu';

// TODO: Need to break up this component, it's all kinds of fucked up
// and recursively renders itself via InlineExpandedChannel which
// feels bad and makes it hard to keep track of props

const DraggableBlock = ({
  canvasSpace,
  setCanvasSpace,
  block,
  width,
  height,
  dragStates,
  setDragStates,
  parentDimensions,
  dragHandleClassName,
  panZoomRef,
  scale,
  ...props
}) => {
  let description;

  let { staticBlock } = props;

  const { workspaceOptions, setWorkspaceOptions, zoomScale, setZoomScale } = useWorkspace();
  const { formation } = workspaceOptions;

  if (block.description && block.description.includes('"x":')) {
    description = JSON.parse(block.description.replace('\n', ''));
  }

  const { selectedConnection, setSelectedConnection } = useSelection();

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
      isInBottomEdge: false
    }
  });

  const rndEl = useRef(null);

  let analytics = window.analytics;

  let handleDragMetric = () => {
    analytics.track('Dragged Block');
  };

  const expandChannelInline = () => {
    setSpatialState({
      ...spatialState,
      isExpanded: true,
      width: 400,
      height: 300
    });
  };

  const retractChannelInline = () => {
    setSpatialState({
      ...spatialState,
      isExpanded: false
    });
  };

  const getMovementDirection = (e, d) => {
    if (Math.sign(d.deltaY) === 1) {
      return { y: 'up' };
    } else if (Math.sign(d.deltaY) === -1) {
      return { y: 'down' };
    }

    if (Math.sign(d.deltaX) === 1) {
      return { x: 'right' };
    } else if (Math.sign(d.deltaX) === -1) {
      return { x: 'left' };
    }
  };
  const handleDragStart = (e) => {
    setDragStates({
      ...dragStates,
      maxZIndex: dragStates.maxZIndex + 1
    });
    setSpatialState({ ...spatialState, zIndex: dragStates.maxZIndex });
    if (spatialState.isBeingDragged) {
      setSpatialState({ ...spatialState, isBeingDragged: true });
    } else {
      return false;
    }
  };

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
        isInLeftEdge: spatialState.cursor.cursorPosition.x < spatialState.cursor.edgeLeft,
        isInRightEdge: spatialState.cursor.cursorPosition.x > spatialState.cursor.edgeRight,
        isInTopEdge: spatialState.cursor.cursorPosition.y < spatialState.cursor.edgeTop,
        isInBottomEdge: spatialState.cursor.cursorPosition.y > spatialState.cursor.edgeBottom
      }
    });

    if (shouldScrollAtEdge(spatialState.cursor, e)) {
      adjustWindowScroll(spatialState.cursor);
    }
  };

  const handleDragStop = (e, d) => {
    if (spatialState.isBeingDragged) {
      setSpatialState({
        ...spatialState,
        isBeingDragged: false,
        x: d.x,
        y: d.y
      });

      handleDragMetric();
    } else {
      if (!staticBlock) {
        setSelectedConnection({
          ...block
        });
      }
    }
  };

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

  const handleResizeStop = (delta) => {
    setSpatialState({
      ...spatialState,
      width: spatialState.width + delta.width,
      height: spatialState.height + delta.height
    });
  };

  const dismissInlineChannel = () => {
    setSpatialState({
      ...spatialState,
      isExpanded: false,
      width: 200,
      height: 200
    });
  };

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
          height: spatialState.height
        }}
        {...props}
      />
    );
  };

  return (
    <BlockContextMenu
      key={block.id}
      block={block}
      formation={formation}>
      <Rnd
        ref={rndEl}
        key={block.id}
        size={{ width: spatialState.width, height: spatialState.height }}
        scale={zoomScale}
        maxWidth="100%"
        position={{
          x: spatialState.x,
          y: spatialState.y
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
          zIndex: spatialState.zIndex
        }}>
        <Card
          interactive={true}
          className={`draggable-block-container ${block.__typename ? block.__typename : ''} ${
            selectedConnection && selectedConnection.id
              ? block.id === selectedConnection.id
                ? 'selected'
                : ''
              : ''
          } ${spatialState.isExpanded ? 'draggable-block-container--expanded' : ''} ${
            spatialState.isBeingDragged ? 'isBeingDragged' : ''
          }`}>
          {spatialState.isExpanded ? (
            renderChannelInline()
          ) : (
            <div className={`block block--${block.__typename.toLowerCase()}`}>
              {block.__typename === 'Channel' && (
                <button className="icon-button" onClick={expandChannelInline}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
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
