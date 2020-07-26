import React, { useRef, useState, Fragment } from "react";
import { useSelection } from "../context/selection-context";
import MillerPanel from "./MillerPanel";
import { useWorkspace } from "../context/workspace-context";
import withApollo from "../lib/withApollo";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default withApollo((props) => {
  const canvas = useRef(null);
  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();

  const ref = useRef(null)

  const [canvasSpace, setCanvasSpace] = useState({
    scrollAreaHeight: null,
    scrollAreaWidth: null,
    maxHeight: null,
    maxWidth: null,
    timer: null,
  });

  console.log(ref);

  return React.Children.map(props.children, (child) =>
    <div ref={ref}>
    {
      React.cloneElement(child, {
      canvasSpace: canvasSpace,
      setCanvasSpace: setCanvasSpace,
    })
    }
    </div>
  );
});
