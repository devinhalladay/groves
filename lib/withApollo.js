import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { parseCookies } from 'nookies';

export default withApollo(
  ({ initialState }) => {
    const token = parseCookies()['access_token']

    return new ApolloClient({
      uri: `${process.env.APPLICATION_API_CALLBACK}/api/apollo-client`,
      ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
      cache: new InMemoryCache().restore(initialState || {}),
      headers: {
        "authorization": `Bearer ${token}`,
        "accept": 'application/json',
        "content-type": 'application/json'
      }
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