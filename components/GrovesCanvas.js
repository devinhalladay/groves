import { useRef, useState } from "react";
import Panel from "./Panel";
import { useSelection } from "../context/selection-context";
import MillerPanel from "./MillerPanel";
import { useWorkspace } from "../context/workspace-context";

export default (props) => {
  const canvas = useRef(null);
  const { selectedChannel } = useSelection();
  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();
  const [canvasSpace, setCanvasSpace] = useState({
    scrollAreaHeight: null,
    scrollAreaWidth: null,
    maxHeight: null,
    maxWidth: null,
    timer: null,
  });

  const handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };

  const handleDragEnd = (e) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  };

  return (
    <div>
      {/* <Panel
        className="formationNavigator"
        pinSide="left"
        panelTitle={"Formations"}
        defaultPosition={{ x: 0, y: 60 }}
        {...props}
      >
        <ul>
          <li class="active">Miller Columns</li>
          <li
            onClick={() => {
              setWorkspaceOptions("mindmap");
            }}
          >
            Mind Map
          </li>
          <li>Rhizome</li>
          <li>Frequency Chart</li>
        </ul>
      </Panel> */}
      {/* <MillerPanel /> */}
      <div>
        {/* <h1>{selectedChannel.title}</h1> */}
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, {
            canvasSpace: canvasSpace,
            setCanvasSpace: setCanvasSpace,
          })
        )}
      </div>
    </div>
  );
};
