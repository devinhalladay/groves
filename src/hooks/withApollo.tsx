import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import withApollo from 'next-with-apollo';
import { parseCookies } from 'nookies';
import { useRef } from 'react';

export default withApollo(
  ({ initialState }) => {
    const token = parseCookies()['access_token'];

    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
        uri: `${process.env.APPLICATION_API_CALLBACK}/api/apollo-client`,
        credentials: 'same-origin',
        headers: {
          authorization: `Bearer ${token}`,
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }),
      cache: new InMemoryCache(),
    });
  },
  {
    render: ({ Page, children, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          {Page && <Page {...props} />}
          {children}
        </ApolloProvider>
      );
    },
  },
);
