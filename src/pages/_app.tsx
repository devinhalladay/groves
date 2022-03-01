import { ApolloProvider } from '@apollo/client';
import { getSession, SessionProvider, signIn, signOut } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GlobalHotKeys } from 'react-hotkeys';
import '~/public/style.scss';
import {
  AuthenticatedHeader,
  ComposedHeader,
  UnauthenticatedHeader,
} from '../components/Header';
import KeyMaps from '../constants/KeyMaps';
import Themes from '../constants/Themes';
import { SelectionProvider } from '../context/selection-context';
import { UserProvider } from '../context/user-context';
import { WorkspaceProvider } from '../context/workspace-context';

interface GrovesClient extends AppProps {
  isAuthenticated: boolean;
}

const GrovesClient = ({
  Component,
  pageProps: { session, ...pageProps },
}: // isAuthenticated,
GrovesClient) => {
  const router = useRouter();

  console.log(session);

  return (
    <>
      <Head>
        <title>Groves: Your Visual Second Brain.</title>
        <meta
          name="title"
          content="Groves — Your workspace for visual thinking."
        />
        <meta
          name="description"
          content="A new tool for visual organization and thinking. Create your own digital garden with a workspace for growing, connecting, and visualizing your ideas."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groves.network/" />
        <meta
          property="og:image"
          content="https://groves.network/og-image.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://groves.network/" />
        <meta
          property="twitter:title"
          content="Groves — Your workspace for visual thinking."
        />
        <meta
          property="twitter:description"
          content="A new tool for thought and visual organization. Create your own digital garden with a workspace for connecting, visualizing, and growing your ideas."
        />
        <meta
          property="twitter:image"
          content="https://groves.network/og-image.png"
        ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {router.pathname === '/test' ? (
        <Component {...pageProps} />
      ) : (
        <SessionProvider session={session}>
          <UserProvider>
            <GlobalHotKeys keyMap={KeyMaps}>
              <ThemeProvider
                attribute="class"
                defaultTheme={Themes.LIGHT}
                enableSystem={false}
                themes={[Themes.DARK, Themes.LIGHT]}
              >
                <WorkspaceProvider>
                  <ComposedHeader {...pageProps} />
                  <Component {...pageProps} />
                </WorkspaceProvider>
              </ThemeProvider>
            </GlobalHotKeys>
          </UserProvider>
        </SessionProvider>
      )}
    </>
  );
};

// GrovesClient.getInitialProps = async ({ ctx }) => {
//   // if (parseCookies(ctx)['access_token']) {
//   //   return { isAuthenticated: true };
//   // }

//   // return { isAuthenticated: false };

//   const session = await getSession({ ctx });
//   console.log(session);

//   return { session: session };
// };

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}

export default GrovesClient;
