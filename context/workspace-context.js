import React, { useContext, createContext, useState } from "react";

const WorkspaceContext = createContext();

const WorkspaceProvider = (props) => {
  const [workspaceOptions, setWorkspaceOptions] = useState(null);

  return (
    <WorkspaceContext.Provider
      value={{ workspaceOptions, setWorkspaceOptions }}
      {...props}
    />
  );
};

const useWorkspace = () => useContext(WorkspaceContext);

export { useWorkspace, WorkspaceProvider, WorkspaceContext };
