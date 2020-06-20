import withApollo from 'next-with-apollo';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { parseCookies } from 'nookies';

export default withApollo(
  ({ initialState }) => {
    const token = parseCookies()['access_token']

    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
        uri: `${process.env.APPLICATION_API_CALLBACK}/api/apollo-client`,
        credentials: 'same-origin',
        headers: {
          "authorization": `Bearer ${token}`,
          "accept": 'application/json',
          "content-type": 'application/json'
        }
      }),
      cache: new InMemoryCache(),
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