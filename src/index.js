import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';

import { CookiesProvider, Cookies } from 'react-cookie';

import { ProvideUser, ProvideAuth } from './api/use-auth'


const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${process.env.REACT_APP_FAUNADB_SECRET_KEY}`,
        }
    }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <CookiesProvider>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </CookiesProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()