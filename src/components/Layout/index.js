import Slider from 'rc-slider';
import React, { useRef, useState } from 'react';
import { PanZoom } from 'react-easy-panzoom';
import SelectionPanel from '~/src/components/SelectionPanel';
import { useSelection } from '@context/selection-context';
import { useWorkspace } from '@context/workspace-context';

const Layout = (props) => {
  // const { workspaceOptions, setWorkspaceOptions } = useWorkspace();

  const panZoomRef = useRef(null);

  let isScrolling;

  // const {
  //   initialSelection,
  //   selectedChannel,
  //   selectedConnection,
  // } = useSelection();

  const { selectedConnection, setSelectedConnection, selectedRef, setSelectedRef } = useSelection();

  const { workSpaceOptions, setWorkspaceOptions, zoomScale, setZoomScale } = useWorkspace();
  const [localZoomScale, setLocalZoomScale] = useState(1);

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

  const onZoom = (e) => {
    if (panZoomRef.current) {
      setLocalZoomScale(panZoomRef.current.scale);
    }
  };

  const onZoomEnd = (e) => {
    if (panZoomRef.current) {
      // setZoomScale(panZoomRef.current.scale);
      setZoomScale(localZoomScale);
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
      <div
        className="zoomTools"
        style={{
          right: selectedConnection ? '330px' : '15px'
        }}>
        <button className="icon-button" onClick={() => onScaleUp(panZoomRef.current.scale)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.875 12.7697C9.63642 12.7697 11.875 10.5311 11.875 7.76971C11.875 5.00829 9.63642 2.76971 6.875 2.76971C4.11358 2.76971 1.875 5.00829 1.875 7.76971C1.875 10.5311 4.11358 12.7697 6.875 12.7697Z"
              stroke="#6F7B8A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.125 14.0197L10.4062 11.301"
              stroke="#6F7B8A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 7.76971H8.75"
              stroke="#6F7B8A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.875 5.89471L6.875 9.64471"
              stroke="#6F7B8A"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
      </div>
      <PanZoom
        ref={panZoomRef}
        preventPan={preventPan}
        className="canvas"
        onZoom={onZoom}
        onZoomEnd={onZoomEnd}
        panZoomRef={panZoomRef}
        scale={zoomScale}
        minZoom={0.4}
        style={{
          width: '100vw',
          height: '100vh',
          WebkitFilter: 'blur(0)',
          willChange: 'unset'
        }}
        maxZoom={3}
        onPanStart={(e) => {
          dragging = false;
        }}
        onPan={() => {
          dragging = true;
        }}
        onPanEnd={(e) => {
          if (!(e.target.className && e.target.className.includes('block')) && !dragging) {
            setSelectedConnection(null);
          }

          dragging = false;
        }}>
        {React.cloneElement(props.children, {
          panZoomRef: panZoomRef
        })}
      </PanZoom>
    </>
  );
};

export const Container = (props) => {
  return props.children;
};

export default Layout;
