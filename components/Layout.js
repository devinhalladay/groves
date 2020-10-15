import React, { Fragment, useEffect, useRef, useState } from "react";
import Slider, { Range } from "rc-slider";
import { useSelection } from "../context/selection-context";
import { PanZoom } from "react-easy-panzoom";
import { useWorkspace } from "../context/workspace-context";

const Layout = (props) => {
  const { selectedConnection } = useSelection();
  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();

  const panZoomRef = useRef(null)

  const preventPan = (event, x, y) => {
    // if the target is the content container then prevent panning
    if (
      event.target.className.includes(
        "block" || "draggable" || "react-draggable"
      )
    ) {
      return true;
    }
  };

  const onWheel = () => {
    panZoomRef.current && setWorkspaceOptions({ ...workspaceOptions, zoomScale: panZoomRef.current.scale})
  }

  return (
    <PanZoom
      ref={panZoomRef}
      // autoCenter={true}
      // boundaryRatioVertical={0.8}
      // boundaryRatioHorizontal={0.8}
      // enableBoundingBox
      // realPinch={true}
      style={{
        width: "100vw",
        height: "100vh",
      }}
      preventPan={preventPan}
      onWheel={onWheel}
    >
      <div className="canvas" style={{ WebkitFilter: "blur(0)" }}>
        <div
          className="zoomTools"
          style={{
            right: selectedConnection ? "330px" : "15px",
          }}
        >
          <button className="icon-button" onClick={() => {}}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.875 12.7697C9.63642 12.7697 11.875 10.5311 11.875 7.76971C11.875 5.00829 9.63642 2.76971 6.875 2.76971C4.11358 2.76971 1.875 5.00829 1.875 7.76971C1.875 10.5311 4.11358 12.7697 6.875 12.7697Z"
                stroke="#6F7B8A"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.125 14.0197L10.4062 11.301"
                stroke="#6F7B8A"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 7.76971H8.75"
                stroke="#6F7B8A"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.875 5.89471L6.875 9.64471"
                stroke="#6F7B8A"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div className="sliderContainer">
            <Slider
              vertical="true"
              onChange={(value) => {
                setScale(value);
              }}
              min={1}
              max={2}
              step={0.07}
            />
          </div>
          <button className="icon-button" onClick={() => {}}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.875 11.875C9.63642 11.875 11.875 9.63642 11.875 6.875C11.875 4.11358 9.63642 1.875 6.875 1.875C4.11358 1.875 1.875 4.11358 1.875 6.875C1.875 9.63642 4.11358 11.875 6.875 11.875Z"
                stroke="#6F7B8A"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.125 13.125L10.4062 10.4062"
                stroke="#6F7B8A"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 6.875H8.75"
                stroke="#6F7B8A"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        {props.children}
      </div>
    </PanZoom>
  );
};

export const Container = (props) => {
  return props.children;
};

export default Layout;
