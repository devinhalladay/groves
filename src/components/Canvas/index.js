import { useWorkspace } from '@context/workspace-context';
import React, { useRef, useState } from 'react';
import { PanZoom } from 'react-easy-panzoom';
import { useSelection } from '~/src/context/selection-context';
import withApollo from '~/src/hooks/withApollo';
import DraggableBlock from '../Block';
import ZoomTools from '~/src/components/ZoomTools'

export default withApollo((props) => {
  const { workspaceOptions, setWorkspaceOptions, zoomScale, setZoomScale } = useWorkspace();

  const [canvasSpace, setCanvasSpace] = useState({
    scrollAreaHeight: null,
    scrollAreaWidth: null,
    maxHeight: null,
    maxWidth: null,
    timer: null,
    workspaceOptions,
    setWorkspaceOptions
  });

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000
  });

  const panZoomRef = useRef(null);

  const { selectedConnection, setSelectedConnection, canvasBlocks } = useSelection();

  const preventPan = (event, x, y) => {
    console.log('eval pan');
    if (
      event.target &&
      event.target.parentElement &&
      event.target.parentElement.className.includes(
        'block' ||
          'draggable' ||
          'react-draggable' ||
          'header' ||
          'nested-canvas' ||
          'draggable-block-container--expanded' ||
          'draggable-block-container' ||
          'block'
      )
    ) {
      return true;
    }
  };

  const onZoomEnd = (e) => {
    if (panZoomRef.current) {
      setZoomScale(panZoomRef.current.scale);
    }
  };

  let dragging = false;

  if (!canvasBlocks && canvasBlocks.length === 0) {
    return (
      <div className={`loading-screen fullscreen`}>
        <p
          style={{
            marginBottom: 20
          }}>
          You can blocks to your canvas using the Grid View.
        </p>
        <Button onClick={_switchToGridFormation} icon={Formations.GRID.icon}>
          Switch to Grid View
        </Button>
      </div>
    );
  }

  return (
    <div className="canvas-container">
      <ZoomTools panZoomRef={panZoomRef} />
      <PanZoom
        ref={panZoomRef}
        preventPan={preventPan}
        className="canvas"
        onZoomEnd={onZoomEnd}
        scale={zoomScale}
        minZoom={0.4}
        autoCenter={true}
        style={{
          width: '100vw',
          height: '100vh',
          WebkitFilter: 'blur(0)',
          willChange: 'unset',
          position: 'relative'
        }}
        maxZoom={3}
        onPanStart={(e) => {
          dragging = false;
        }}
        onPan={() => {
          dragging = true;
        }}
        onPanEnd={(e) => {
          if (
            !(e.target && e.target.className) &&
            e.target.className.includes('block') &&
            !dragging
          ) {
            setSelectedConnection(null);
          }

          dragging = false;
        }}>
        {canvasBlocks.map((block, i) => (
          <DraggableBlock
            title={block.title ? block.title : null}
            type={block.__typename}
            dragStates={dragStates}
            setDragStates={setDragStates}
            panZoomRef={props.panZoomRef}
            key={block.id}
            block={block}
            canvasSpace={canvasSpace}
            setCanvasSpace={setCanvasSpace}
            bounds="parent"
            {...props}
          />
        ))}
      </PanZoom>
    </div>
  );
});
