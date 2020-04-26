import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { parseCookies } from 'nookies';

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: 'https://api.are.na/graphql',
      connectToDevTools: process.browser,
      ssrMode: !process.browser,
      cache: new InMemoryCache().restore(initialState || {}),
      headers: {
        "authorization": `Bearer ${parseCookies()['access_token']}`,
        "X-APP-TOKEN": process.env.GRAPHQL_TOKEN
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
