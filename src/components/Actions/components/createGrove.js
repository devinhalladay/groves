import { Button, Colors } from '@blueprintjs/core';
import React from 'react';
import CreateGrove from '~/public/create-grove.svg';
import { useTheme } from '~/src/context/theme-provider';

export default function CreateGroveAction() {
  const { theme } = useTheme();
  return (
    <Button className="action">
      <CreateGrove
        fill={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
        stroke={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
      />
    </Button>
  );
}
