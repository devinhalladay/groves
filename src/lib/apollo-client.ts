import { getSession } from 'next-auth/react';
import { ApolloClient, from, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: `${process.env.APPLICATION_API_CALLBACK}/api/apollo-client`,
  credentials: 'same-origin',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
});

const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
  const session = await getSession();

  const modifiedHeader = {
    headers: {
      ...headers,
      authorization: session?.accessToken
        ? `Bearer ${session.accessToken}`
        : '',
    },
  };

  return modifiedHeader;
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
});

export default client;
