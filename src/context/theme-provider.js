import React, { useContext, createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = (props) => {
  let isDarkMode = false;
  const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light');

  useEffect(() => {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }} {...props}>
      <div className={`theme-container bp3-${theme}`}>{props.children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider, ThemeContext };
