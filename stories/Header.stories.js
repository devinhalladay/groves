import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'Welcome',
  component: Welcome,
};

export const Header = () => <Welcome showApp={linkTo('Button')} />;

Header.story = {
  name: 'header',
};