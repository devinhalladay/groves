import { Button, Colors, Icon } from '@blueprintjs/core';
import { Icons } from '@blueprintjs/icons';
import MoonIcon from '~/public/moon.svg';
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
      <Button className="action" onClick={handleThemeSwitch} minimal={true}>
        {theme === 'dark' ? <MoonIcon fill={Colors.WHITE} /> : <Icon icon="flash" />}
      </Button>
    </>
  );
};

export default DarkModeAction;
