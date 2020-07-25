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

const DraggableBlock = ({ canvasSpace, setCanvasSpace, block, width, height, ...props }) => {
  console.log(props.client);
  const [zIndex, setZIndex] = useState(1000);
  const [blockLocalState, setBlockLocalState] = useState({
    ...block,
    isExpanded: false,
    draggingEnabled: true
  });
  const [spatialState, setSpatialState] = useState({
    x: 200,
    y: 200,
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

  let analytics = window.analytics;

  let handleDragMetric = () => {
    analytics.track("Dragged Block");
  };

  const expandChannelInline = (channel) => {
    setBlockLocalState({
      ...blockLocalState,
      isExpanded: true,
    });
    setSpatialState({
      ...spatialState,
      width: 800,
      height: 600
    })
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
      lockAspectRatio="true"
      position={{ x: spatialState.x, y: spatialState.y }}
      onDragStart={(e) => {
        props.setDragStates({
          ...props.dragStates,
          maxZIndex: props.dragStates.maxZIndex + 1,
        });
        setZIndex(props.dragStates.maxZIndex);
        setSpatialState({ ...spatialState, isBeingDragged: true });
      }}
      disableDragging={blockLocalState.isExpanded}
      onDrag={(e, d) => {
        setSpatialState({
          ...spatialState,
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
      onDragStop={(e, d) => {
        setSpatialState({
          ...spatialState,
          isBeingDragged: false,
          x: d.x,
          y: d.y,
        });
        handleDragMetric();
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSpatialState({
          ...spatialState,
          width: ref.style.width,
          height: ref.style.height,
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
        onClick={() => {
          if (block.__typename === "Channel") {
            expandChannelInline();
          }
        }}
      >
        {blockLocalState.isExpanded ? (
          <div className="block">
            <p>{block.title}</p>
            <InlineExpandedChannel
              channel={block}
              dragStates={dragStates}
              setDragStates={setDragStates}
              setSpatialState={setSpatialState}
              spatialState={spatialState}
            />
          </div>
        ) : (
          <div className="block">
            <BlockRepresentation block={block} />
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default DraggableBlock;
