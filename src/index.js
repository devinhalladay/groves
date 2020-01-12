import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo'

import { CookiesProvider, Cookies } from 'react-cookie';

import { ProvideUser, ProvideAuth } from './api/use-auth'

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()