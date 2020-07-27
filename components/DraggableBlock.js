import { useState, useRef } from "react";
import BlockRepresentation from "./BlockRepresentation";
import { Rnd } from "react-rnd";
import {
  cursorPositionInViewport,
  viewportDimensions,
  shouldScrollAtEdge,
  adjustWindowScroll,
} from "../utils/canvas";
import InlineExpandedChannel from "./InlineExpandedChannel";
import { useSelection } from "../context/selection-context";

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
  ...props
}) => {
  let description;

  if (block.description && block.description.includes('"x":')) {
    description = JSON.parse(block.description.replace("\n", ""));
  }
  const [zIndex, setZIndex] = useState(dragStates.maxZIndex);

  const { selectedConnection, setSelectedConnection } = useSelection();

  const [blockLocalState, setBlockLocalState] = useState({
    ...block,
    isExpanded: false,
    draggingEnabled: true,
  });

  const [spatialState, setSpatialState] = useState({
    x: (() => {
      if (description) {
        return description.x;
      } else if (parentDimensions) {
        return Math.random(parentDimensions.width) * parentDimensions.width;
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

  let analytics = window.analytics;

  let handleDragMetric = () => {
    analytics.track("Dragged Block");
  };

  const expandChannelInline = () => {
    setBlockLocalState({
      ...blockLocalState,
      isExpanded: true,
    });
  };

  const retractChannelInline = () => {
    setBlockLocalState({
      ...blockLocalState,
      isExpanded: false,
    });
  };

  const getMovementDirection = (e, d) => {
    if (Math.sign(d.deltaY) === 1) {
      return { y: "up" };
    } else if (Math.sign(d.deltaY) === -1) {
      return { y: "down" };
    }

    if (Math.sign(d.deltaX) === 1) {
      return { x: "right" };
    } else if (Math.sign(d.deltaX) === -1) {
      return { x: "left" };
    }
  };
  const handleDragStart = (e) => {
    setZIndex(dragStates.maxZIndex + 1);
    setDragStates({
      ...dragStates,
      maxZIndex: dragStates.maxZIndex + 1,
    });
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
      setSelectedConnection({
        ...block,
      });
    }
  };

  const dismissInlineChannel = () => {
    setBlockLocalState({
      ...blockLocalState,
      isExpanded: false,
    });

    setSpatialState({
      ...spatialState,
      width: 200,
      height: 200,
    });
  };

  const handleResize = (delta) => {
    if (block.__typename === "Channel") {
      if (
        spatialState.width + delta.width <= 500 &&
        spatialState.height + delta.height <= 400
      ) {
        retractChannelInline();
      } else if (
        spatialState.width + delta.width > 500 &&
        spatialState.height + delta.height > 400
      ) {
        expandChannelInline();
      }
    }
  };

  const handleResizeStop = (delta) => {
    setSpatialState({
      ...spatialState,
      width: spatialState.width + delta.width,
      height: spatialState.height + delta.height,
    });
  };

  const renderChannelInline = () => {
    return (
      <div
        className={`block block--${block.__typename.toLowerCase()} block--expanded`}
      >
        <InlineExpandedChannel
          channel={block}
          dragStates={dragStates}
          setDragStates={setDragStates}
          setSpatialState={setSpatialState}
          spatialState={spatialState}
          parentDimensions={{
            width: spatialState.width,
            height: spatialState.height,
          }}
          dragHandleClassName="header"
          dismissInlineChannel={dismissInlineChannel}
          {...props}
        />
      </div>
    );
  };

  const blockProps = {
    block: block,
    dragStates: dragStates,
    setDragStates: setDragStates,
    setSpatialState: setSpatialState,
    spatialState: spatialState,
  };

  return (
    <Rnd
      ref={rndEl}
      key={block.id}
      size={{ width: spatialState.width, height: spatialState.height }}
      position={{
        x: spatialState.x,
        y: spatialState.y,
      }}
      onDragStart={(e) => {
        handleDragStart(e);
      }}
      // disableDragging={blockLocalState.isExpanded}
      onDrag={(e, d) => {
        handleDrag(e, d);
      }}
      onDragStop={(e, d) => {
        handleDragStop(e, d);
      }}
      dragHandleClassName={dragHandleClassName}
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
        zIndex: zIndex,
      }}
    >
      <div
        className={`draggable-block-container ${
          block.__typename ? block.__typename : ""
        } ${
          selectedConnection && selectedConnection.id
            ? block.id === selectedConnection.id
              ? "selected"
              : ""
            : ""
        }`}
      >
        {blockLocalState.isExpanded ? (
          renderChannelInline()
        ) : (
          <div className={`block block--${block.__typename.toLowerCase()}`}>
            <BlockRepresentation block={block} />
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default DraggableBlock;
