import '../public/styles/style.scss';

import { MockedProvider } from '@apollo/client/testing';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
};
