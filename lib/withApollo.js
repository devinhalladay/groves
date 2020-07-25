import withApollo from "next-with-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { parseCookies } from "nookies";
import { useRef } from "react";

export default withApollo(
  ({ initialState }) => {
    const token = parseCookies()["access_token"];

    return new ApolloClient({
      ssrMode: typeof window === "undefined",
      link: new HttpLink({
        uri: `${process.env.APPLICATION_API_CALLBACK}/api/apollo-client`,
        credentials: "same-origin",
        headers: {
          authorization: `Bearer ${token}`,
          accept: "application/json",
          "content-type": "application/json",
        },
      }),
      cache: new InMemoryCache(),
    });
  },
  {
    render: ({ Page, children, props }) => {
      const ref = useRef(null);

      return (
        <ApolloProvider ref={ref} client={props.apollo}>
          {
            Page &&
              <Page {...props} /> 
          }
          {children}
        </ApolloProvider>
      );
    },
  }
);
