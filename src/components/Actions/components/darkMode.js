import { Button, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useTheme } from '~/src/context/theme-provider';

const DarkModeAction = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <Button className="action" onClick={handleThemeSwitch}>
      <Icon icon={theme === 'dark' ? IconNames.MOON : IconNames.FLASH} />
    </Button>
  );
};

export default DarkModeAction;
