import React, { createContext, useContext, useState } from 'react';
import Formations from '../constants/Formations';

const WorkspaceContext = createContext();

const WorkspaceProvider = (props) => {
  const [workspaceOptions, setWorkspaceOptions] = useState({
    formation: Formations.GRID,
  });

  const [zoomScale, setZoomScale] = useState(1);

  return (
    <WorkspaceContext.Provider
      value={{ workspaceOptions, setWorkspaceOptions, zoomScale, setZoomScale }}
      {...props}
    />
  );
};

const useWorkspace = () => useContext(WorkspaceContext);

export { useWorkspace, WorkspaceProvider, WorkspaceContext };
