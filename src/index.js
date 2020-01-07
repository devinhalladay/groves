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


const httpLink = createHttpLink({
uri: 'https://graphql.fauna.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('auth_token');

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
});

ReactDOM.render(
  <CookiesProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </CookiesProvider>,
  document.getElementById('root')
)

serviceWorker.unregister();  