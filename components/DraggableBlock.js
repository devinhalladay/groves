import Draggable from "react-draggable";
import Collapsible from "react-collapsible";
import { useState, useEffect, useRef } from "react";
import BlockRepresentation from "./BlockRepresentation";
import { Rnd } from "react-rnd";
import useEventListener from "@use-it/event-listener";
import {
  cursorPositionInViewport,
  viewportDimensions,
  shouldScrollAtEdge,
  adjustWindowScroll,
} from "../utils/canvas";

const DraggableBlock = ({ canvasSpace, setCanvasSpace, ...props }) => {
  const [zIndex, setZIndex] = useState(1000);
  const [spatialState, setSpatialState] = useState({
    x: 200,
    y: 200,
    width: 200,
    height: 200,
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

  // useEventListener(
  //   'mousedown',
  //   (e) => {
  //     console.log('uh');
  //     const position = cursorPositionInViewport(e);
  //     console.log(position);
  //     // const pagePosition = cursorPositionInPage(e)
  //   },
  //   rndEl.current
  // );

  // useEventListener('mouseup', (e) => {
  //   e.preventDefault();
  //   stopDraggingItem(e);
  // });

  // useEventListener('mousemove', (e) => {
  //   e.preventDefault();
  //   let viewport = viewportDimensions()
  //   let cursor = cursorPositionInViewport(e)

  //   if (state.isBeingDragged) {
  //     dragItem(e);
  //   }
  // });

  const getMovementDirection = (e, d) => {
    // const currentCursor = cursorPositionInViewport(e);
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
      key={props.block.id}
      size={{ width: spatialState.width, height: spatialState.height }}
      lockAspectRatio="true"
      position={{ x: spatialState.x, y: spatialState.y }}
      onDragStart={() => {
        props.setDragStates({
          ...props.dragStates,
          maxZIndex: props.dragStates.maxZIndex + 1,
        });
        setZIndex(props.dragStates.maxZIndex);
        setSpatialState({ ...spatialState, isBeingDragged: true });
      }}
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
          props.block.__typename ? props.block.__typename : ""
        }`}
      >
        <div className="block">
          <BlockRepresentation block={props.block} />
        </div>
      </div>
    </Rnd>
  );
};

export default DraggableBlock;
