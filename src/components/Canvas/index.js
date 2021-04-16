import React, { useRef, useState } from 'react';
import { useWorkspace } from '@context/workspace-context';
import withApollo from '~/src/hooks/withApollo';
import { PanZoom } from 'react-easy-panzoom';
import { useSelection } from '~/src/context/selection-context';
import Slider from 'rc-slider';
import ZoomInIcon from '~/public/zoom-in.svg';
import SelectionPanel from '../SelectionPanel';

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

  const panZoomRef = useRef(null);

  const { selectedConnection, setSelectedConnection, selectedRef, setSelectedRef } = useSelection();

  const preventPan = (event, x, y) => {
    console.log(event.target.parentElement);
    // event.preventDefault()
    // if the target is the content container then prevent panning
    console.log(event.target);
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
      console.log('true');
      return true;
    }
  };

  const onZoomEnd = (e) => {
    if (panZoomRef.current) {
      setZoomScale(panZoomRef.current.scale);
    }
  };

  const onScaleUp = (scale) => {
    panZoomRef.current && panZoomRef.current.setScale(scale + 0.1);
  };

  const onScaleDown = (scale) => {
    panZoomRef.current && panZoomRef.current.setScale(scale - 0.1);
  };

  const onScale = (value) => {
    panZoomRef.current && panZoomRef.current.setScale(value);
  };

  let dragging = false;

  return (
    <>
      {selectedConnection && <SelectionPanel />}
      {/* <div
        className="zoomTools"
        style={{
          right: selectedConnection ? '330px' : '15px'
        }}>
        <button className="icon-button" onClick={() => onScaleUp(panZoomRef.current.scale)}>
          <ZoomInIcon />
        </button>
        <div className="sliderContainer">
          <Slider
            vertical="true"
            onChange={onScale}
            min={0.5}
            max={1.5}
            defaultValue={1}
            step={0.1}
            value={zoomScale}
          />
        </div>
        <button className="icon-button" onClick={() => onScaleDown(panZoomRef.current.scale)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.875 11.875C9.63642 11.875 11.875 9.63642 11.875 6.875C11.875 4.11358 9.63642 1.875 6.875 1.875C4.11358 1.875 1.875 4.11358 1.875 6.875C1.875 9.63642 4.11358 11.875 6.875 11.875Z"
              stroke="#6F7B8A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.125 13.125L10.4062 10.4062"
              stroke="#6F7B8A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M5 6.875H8.75" stroke="#6F7B8A" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div> */}
      <PanZoom
        ref={panZoomRef}
        preventPan={preventPan}
        className="canvas"
        // onZoom={onZoom}
        onZoomEnd={onZoomEnd}
        // panZoomRef={panZoomRef}
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
        {React.cloneElement(props.children, {
          panZoomRef: panZoomRef,
          canvasSpace: canvasSpace,
          setCanvasSpace: setCanvasSpace
        })}
      </PanZoom>
    </>
  );
});
