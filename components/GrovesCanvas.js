import React, { useRef, useState, Fragment } from "react";
import { useSelection } from "../context/selection-context";
import MillerPanel from "./MillerPanel";
import { useWorkspace } from "../context/workspace-context";
import withApollo from "../lib/withApollo";

export default withApollo((props) => {
  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();

  const [canvasSpace, setCanvasSpace] = useState({
    scrollAreaHeight: null,
    scrollAreaWidth: null,
    maxHeight: null,
    maxWidth: null,
    timer: null,
  });

  return React.Children.map(props.children, (child) =>
    React.cloneElement(child, {
      canvasSpace: canvasSpace,
      setCanvasSpace: setCanvasSpace,
    })
  );
});
