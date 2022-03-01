import React, { createContext, useContext, useEffect, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

import { useTheme } from 'next-themes';
import Formations from '../constants/Formations';
import Themes from '../constants/Themes';

const WorkspaceContext = createContext(null);

type FormationKeys = keyof typeof Formations;

export type WorkspaceOptions = {
  formation: typeof Formations[FormationKeys];
};

const WorkspaceProvider = (props) => {
  const [workspaceOptions, setWorkspaceOptions] = useState<WorkspaceOptions>({
    formation: Formations.GRID,
  });

  const [zoomScale, setZoomScale] = useState(1);

  const { theme, setTheme } = useTheme();

  const handleThemeSwitch = () => {
    if (theme === Themes.LIGHT) {
      setTheme(Themes.DARK);
    } else if (theme === Themes.DARK) {
      setTheme(Themes.LIGHT);
    }
  };

  const keyHandlers = {
    SWITCH_THEME: handleThemeSwitch,
  };

  return (
    <WorkspaceContext.Provider
      value={{ workspaceOptions, setWorkspaceOptions, zoomScale, setZoomScale }}
      {...props}
    >
      <GlobalHotKeys handlers={keyHandlers} />
      {props.children}
    </WorkspaceContext.Provider>
  );
};

const useWorkspace = () => useContext(WorkspaceContext);

export { useWorkspace, WorkspaceProvider, WorkspaceContext };
