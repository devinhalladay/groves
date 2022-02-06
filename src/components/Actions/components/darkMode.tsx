import { Button, Colors, Icon } from '@blueprintjs/core';
import MoonIcon from '~/public/moon.svg';

import { useTheme } from 'next-themes';
import Themes from '~/src/constants/Themes';

const DarkModeAction = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeSwitch = () => {
    console.log('testset');

    console.log(theme);

    if (theme === Themes.LIGHT) {
      setTheme(Themes.DARK);
    } else if (theme === Themes.DARK) {
      setTheme(Themes.LIGHT);
    }
  };

  return (
    <>
      <Button className="action" onClick={handleThemeSwitch} minimal={true}>
        {theme === Themes.DARK ? (
          <MoonIcon fill={Colors.WHITE} />
        ) : (
          <Icon icon="flash" />
        )}
      </Button>
    </>
  );
};

export default DarkModeAction;
