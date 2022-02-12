import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import { configure, GlobalHotKeys } from 'react-hotkeys';
import '~/public/style.scss';
import {
  AuthenticatedHeader,
  UnauthenticatedHeader,
} from '~/src/components/Header';
import KeyMaps from '../constants/KeyMaps';
import { AuthProvider } from '../context/auth-context';
import { SelectionProvider } from '../context/selection-context';
import { UserProvider } from '../context/user-context';
import { ThemeProvider } from 'next-themes';
import { WorkspaceProvider } from '../context/workspace-context';
import Themes from '../constants/Themes';
import { AppToaster } from '../components/useToast';

interface GrovesClient extends AppProps {
  isAuthenticated: boolean;
}

const GrovesClient = ({
  Component,
  pageProps,
  isAuthenticated,
}: GrovesClient) => {
  const router = useRouter();

  if (isAuthenticated) {
    configure({
      simulateMissingKeyPressEvents: false,
      ignoreKeymapAndHandlerChangesByDefault: false,
    });
  }

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
        <AuthProvider>
          {isAuthenticated ? (
            <UserProvider>
              <GlobalHotKeys keyMap={KeyMaps}>
                <ThemeProvider
                  attribute="class"
                  defaultTheme={Themes.LIGHT}
                  enableSystem={false}
                  // value={{ dark: Themes.DARK, light: Themes.LIGHT }}
                  themes={[Themes.DARK, Themes.LIGHT]}
                >
                  <WorkspaceProvider>
                    <AuthenticatedHeader {...pageProps} />
                    <Component {...pageProps} />
                  </WorkspaceProvider>
                </ThemeProvider>
              </GlobalHotKeys>
            </UserProvider>
          ) : (
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme={Themes.LIGHT}
              // value={{ dark: Themes.DARK, light: Themes.LIGHT }}
              themes={[Themes.DARK, Themes.LIGHT]}
            >
              <WorkspaceProvider>
                <UnauthenticatedHeader {...pageProps} />
                <SelectionProvider>
                  <Component {...pageProps} />
                </SelectionProvider>
              </WorkspaceProvider>
            </ThemeProvider>
          )}
        </AuthProvider>
      )}
    </>
  );
};

GrovesClient.getInitialProps = ({ ctx }) => {
  if (parseCookies(ctx)['access_token']) {
    return { isAuthenticated: true };
  }

  return { isAuthenticated: false };
};

export default GrovesClient;
