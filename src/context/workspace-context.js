import React, { useContext, createContext, useState } from 'react';
import { IconNames } from '@blueprintjs/icons';

const WorkspaceContext = createContext();

const WorkspaceProvider = (props) => {
  const formations = {
    GRID: {
      key: 'GRID',
      value: 'grid',
      title: 'Grid',
      icon: IconNames.GRID_VIEW
    },
    CANVAS: {
      key: 'CANVAS',
      value: 'canvas',
      title: 'Canvas',
      icon: IconNames.WIDGET
    },
    CHANNEL_INDEX: {
      key: 'CHANNEL_INDEX',
      value: 'channelIndex',
      title: 'Channel Index',
      icon: IconNames.LIST_DETAIL_VIEW
    }
  };

  const [workspaceOptions, setWorkspaceOptions] = useState({
    formation: formations.GRID
  });

  const [zoomScale, setZoomScale] = useState(1);

  return (
    <WorkspaceContext.Provider
      value={{ workspaceOptions, setWorkspaceOptions, zoomScale, setZoomScale, formations }}
      {...props}
    />
  );
};

const useWorkspace = () => useContext(WorkspaceContext);

export { useWorkspace, WorkspaceProvider, WorkspaceContext };
