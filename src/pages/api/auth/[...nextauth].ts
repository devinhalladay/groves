import NextAuth from 'next-auth';

export default NextAuth({
  // Configure one or more authentication providers
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    }
  },
  providers: [
    {
      id: 'arena',
      name: 'Are.na',
      type: 'oauth',
      authorization: {
        url: 'https://dev.are.na/oauth/authorize',
        params: {
          scope: null
        }
      },
      token: 'https://dev.are.na/oauth/token?grant_type=authorization_code',
      clientId: process.env.APPLICATION_ID,
      clientSecret: process.env.APPLICATION_SECRET,
      userinfo: 'https://api.are.na/v2/me',
      profile(profile) {
        console.log(profile);

        return {
          id: profile.id,
          name: profile.full_name,
          avatar: profile.avatar,

        };
      },
    },
  ],
});
