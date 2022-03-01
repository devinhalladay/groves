import { Ervell } from '~/src/types';
import { CURRENT_USER } from '~/src/graphql/queries';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import NextAuth from 'next-auth';

export function createApolloClient(token) {
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
}

export default NextAuth({
  // Configure one or more authentication providers
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      // if (profile) {
      //   token.user = profile;
      // }

      // if (user) {
      //   token.user = user;
      // }

      return token;
    },
  },
  providers: [
    {
      id: 'arena',
      name: 'Are.na',
      type: 'oauth',
      authorization: {
        url: 'https://dev.are.na/oauth/authorize',
        params: {
          scope: null,
        },
      },
      token: 'https://dev.are.na/oauth/token?grant_type=authorization_code',
      clientId: process.env.APPLICATION_ID,
      clientSecret: process.env.APPLICATION_SECRET,
      userinfo: {
        request: async ({ tokens, client }) => {
          const { access_token } = tokens;

          if (!access_token) throw new Error('Access token is missing');

          const apollo = createApolloClient(tokens.access_token);

          const res = await apollo.query({
            query: CURRENT_USER,
          });

          if (res.data) {
            return res.data.me;
          }

          throw new Error(
            'Something went wrong while trying to access your shop',
          );
        },
      },
      profile: async (profile, tokens) => {
        return { ...profile };
      },
    },
  ],
});
