import React, { useState } from 'react';
import { useWorkspace } from '@context/workspace-context';
import withApollo from '~/src/hooks/withApollo';

export default withApollo((props) => {
  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();

  const [canvasSpace, setCanvasSpace] = useState({
    scrollAreaHeight: null,
    scrollAreaWidth: null,
    maxHeight: null,
    maxWidth: null,
    timer: null,
    workspaceOptions,
    setWorkspaceOptions
  });

  return React.Children.map(props.children, (child) =>
    React.cloneElement(child, {
      canvasSpace: canvasSpace,
      setCanvasSpace: setCanvasSpace
    })
  );
});
