import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { parseCookies } from 'nookies';

export default withApollo(
  ({ initialState }) => {
    const token = parseCookies()['access_token']

    return new ApolloClient({
      uri: `${process.env.APPLICATION_API_CALLBACK}/api/apollo-client`,
      ssrMode: true,
      cache: new InMemoryCache().restore(initialState || {}),
      headers: {
        "authorization": `Bearer ${token}`
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);