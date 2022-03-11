import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import withApollo from 'next-with-apollo';

interface RenderOptions {
  children: React.ReactNode[];
  Page: NextPage;
  props: any;
}

const httpLink = createHttpLink({
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

export default withApollo<NextPage>(() => client, {
  render: ({ Page, props }: RenderOptions) => {
    return (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    );
  },
});
