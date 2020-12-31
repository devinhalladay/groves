import React, { useContext, createContext, useState } from 'react';

const WorkspaceContext = createContext();

const WorkspaceProvider = (props) => {
  const [workspaceOptions, setWorkspaceOptions] = useState({
    formation: 'grid'
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
