import { AppProps } from 'next/app';
import { Analytics, AnalyticsBrowser, Context } from '@segment/analytics-next';
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { configure, GlobalHotKeys } from 'react-hotkeys';
import '~/public/style.scss';
import {
  AuthenticatedHeader,
  UnauthenticatedHeader,
} from '~/src/components/Header';
import KeyMaps from '../constants/KeyMaps';
import { AuthProvider } from '../context/auth-context';
import * as snippet from '@segment/snippet';
import { SelectionProvider } from '../context/selection-context';
import { ThemeProvider } from '../context/theme-provider';
import { UserProvider } from '../context/user-context';
import { WorkspaceProvider } from '../context/workspace-context';

interface GrovesClient extends AppProps {
  isAuthenticated: boolean;
}

const SEGMENT_ID = process.env.SEGMENT_ID;

const GrovesClient = ({
  Component,
  pageProps,
  isAuthenticated,
}: GrovesClient) => {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);
  const [writeKey, setWriteKey] = useState('4TeWCt1kFP32yi2z02MP0yLhXaDjECqs');

  if (isAuthenticated) {
    configure({
      simulateMissingKeyPressEvents: false,
      ignoreKeymapAndHandlerChangesByDefault: false,
    });
  }

  useEffect(() => {
    const loadAnalytics = async () => {
      let [response] = await AnalyticsBrowser.load({ writeKey });
      setAnalytics(response);
    };
    loadAnalytics();
    analytics?.page();
  }, [writeKey]);

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
                <ThemeProvider>
                  <WorkspaceProvider>
                    <AuthenticatedHeader {...pageProps} />
                    <Component {...pageProps} />
                  </WorkspaceProvider>
                </ThemeProvider>
              </GlobalHotKeys>
            </UserProvider>
          ) : (
            <ThemeProvider>
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
