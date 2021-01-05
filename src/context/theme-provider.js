import React, { useContext, createContext, useState, useEffect, useCallback } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import KeyMaps from '../constants/KeyMaps';

const ThemeContext = createContext();

const ThemeProvider = (props) => {
  let isDarkMode = false;
  const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light');

  const handleThemeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    }
  };

  useEffect(() => {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  }, []);

  const keyHandlers = {
    SWITCH_THEME: handleThemeSwitch
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} {...props}>
      <GlobalHotKeys handlers={keyHandlers} />
      <div className={`theme-container bp3-${theme}`}>{props.children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider, ThemeContext };
