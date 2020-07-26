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
import withApollo from "../lib/withApollo";

const DraggableBlock = ({
  canvasSpace,
  setCanvasSpace,
  block,
  width,
  height,
  ...props
}) => {
  const description = JSON.parse(block.description.replace("\n", ""));
  const [zIndex, setZIndex] = useState(1000);
  const [blockLocalState, setBlockLocalState] = useState({
    ...block,
    isExpanded: false,
    draggingEnabled: true,
  });
  const [spatialState, setSpatialState] = useState({
    x: description.x || Math.random(window.innerWidth),
    y: description.y || Math.random(window.innerHeight),
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

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000,
  });

  const rndEl = useRef(null);

  let timeout = null;

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

  return (
    <Rnd
      ref={rndEl}
      key={block.id}
      size={{ width: spatialState.width, height: spatialState.height }}
      position={{ x: block.description.x || spatialState.x, y: block.description.y || spatialState.y }}
      onDragStart={(e) => {
        if (spatialState.isBeingDragged) {
          props.setDragStates({
            ...props.dragStates,
            maxZIndex: props.dragStates.maxZIndex + 1,
          });
          setZIndex(props.dragStates.maxZIndex);
          setSpatialState({ ...spatialState, isBeingDragged: true });
        } else {
          return false;
        }
      }}
      disableDragging={blockLocalState.isExpanded}
      onDrag={(e, d) => {
        setSpatialState({
          ...spatialState,
          isBeingDragged: true,
          cursor: {
            ...spatialState.cursor,
            movementDirection: getMovementDirection(e, d),
            cursorPosition: cursorPositionInViewport(e),
            edgeBottom:
              viewportDimensions().height - spatialState.cursor.edgeSize,
            edgeRight:
              viewportDimensions().width - spatialState.cursor.edgeSize,
            isInLeftEdge:
              spatialState.cursor.cursorPosition.x <
              spatialState.cursor.edgeLeft,
            isInRightEdge:
              spatialState.cursor.cursorPosition.x >
              spatialState.cursor.edgeRight,
            isInTopEdge:
              spatialState.cursor.cursorPosition.y <
              spatialState.cursor.edgeTop,
            isInBottomEdge:
              spatialState.cursor.cursorPosition.y >
              spatialState.cursor.edgeBottom,
          },
        });

        if (shouldScrollAtEdge(spatialState.cursor, e)) {
          adjustWindowScroll(spatialState.cursor);
        }
      }}
      onDragStop={(e, d, deltaX, deltaY) => {
        setSpatialState({
          ...spatialState,
          isBeingDragged: false,
          x: d.x,
          y: d.y,
        });

        handleDragMetric();
      }}

      // bounds="parent"

      onResize={(e, direction, ref, delta, position) => {
        if (spatialState.width + delta.width >= 500 && spatialState.height + delta.height >= 400) {
          if (block.__typename === "Channel") {
            expandChannelInline();
          }
        } else {
          if (block.__typename === "Channel") {
            retractChannelInline();
          }
        }
      }}

      onResizeStop={(e, direction, ref, delta, position) => {
        console.log(spatialState.width + delta.width)
        setSpatialState({
          ...spatialState,
          width: spatialState.width + delta.width,
          height: spatialState.height + delta.height,
        });
      }}
      style={{
        zIndex: zIndex,
      }}
    >
      <div
        className={`draggable-block-container ${
          block.__typename ? block.__typename : ""
        }`}
      >
        {blockLocalState.isExpanded ? (
          <div
            className={`block block--${block.__typename.toLowerCase()} block--expanded`}
          >
            <InlineExpandedChannel
              channel={block}
              dragStates={dragStates}
              setDragStates={setDragStates}
              setSpatialState={setSpatialState}
              spatialState={spatialState}
            />
          </div>
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
