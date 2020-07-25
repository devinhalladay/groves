import { useRef, useState } from "react";
import { useSelection } from "../context/selection-context";
import MillerPanel from "./MillerPanel";
import { useWorkspace } from "../context/workspace-context";
import withApollo from "../lib/withApollo";

export default withApollo((props) => {
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

  return (
    <div>
      {/* <MillerPanel /> */}
      <div>
        {React.Children.map(props.children, (child) =>
          React.cloneElement(child, {
            canvasSpace: canvasSpace,
            setCanvasSpace: setCanvasSpace,
          })
        )}
      </div>
    </div>
  );
});
