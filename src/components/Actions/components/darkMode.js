import { Button, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useCallback } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import KeyMaps from '~/src/constants/KeyMaps';
import { useTheme } from '~/src/context/theme-provider';

const DarkModeAction = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    }
  };

  return (
    <>
      <Button className="action" onClick={handleThemeSwitch}>
        <Icon icon={theme === 'dark' ? IconNames.MOON : IconNames.FLASH} />
      </Button>
    </>
  );
};

export default DarkModeAction;
