import { Button, Icon, Colors } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useCallback } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import KeyMaps from '~/src/constants/KeyMaps';
import { useTheme } from '~/src/context/theme-provider';
import MoonIcon from '~/public/moon.svg';

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
      <Button className="action" onClick={handleThemeSwitch} minimal={true}>
        {theme === 'dark' ? <MoonIcon fill={Colors.WHITE} /> : <Icon icon={IconNames.FLASH} />}
      </Button>
    </>
  );
};

export default DarkModeAction;
