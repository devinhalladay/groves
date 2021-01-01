import React, { useContext, createContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
      {...props}>
      <div className={`theme-container bp3-${theme}`}>{props.children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider, ThemeContext };
