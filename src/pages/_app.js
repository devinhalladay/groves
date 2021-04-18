import Head from 'next/head';
import { parseCookies } from 'nookies';
import React, { useEffect } from 'react';
import { configure, GlobalHotKeys } from 'react-hotkeys';
import '~/public/slider.scss';
import '~/public/style.scss';
import '~/public/tippy.scss';
import '~/public/toastify/main.scss';
import { AuthenticatedHeader, UnauthenticatedHeader } from '~/src/components/Header';
import KeyMaps from '../constants/KeyMaps';
import { AuthProvider } from '../context/auth-context';
import { ThemeProvider } from '../context/theme-provider';
import { UserProvider } from '../context/user-context';
import { WorkspaceProvider } from '../context/workspace-context';

const GrovesClient = ({ Component, pageProps, isAuthenticated }) => {
  useEffect(() => {
    analytics.page();
  }, []);

  if (isAuthenticated) {
    configure({
      simulateMissingKeyPressEvents: false,
      ignoreKeymapAndHandlerChangesByDefault: false
    });
  }

  return (
    <>
      <Head>
        <title>Groves: Your Visual Second Brain.</title>
        <meta name="title" content="Groves — Your workspace for visual thinking." />
        <meta
          name="description"
          content="A new tool for visual organization and thinking. Create your own digital garden with a workspace for growing, connecting, and visualizing your ideas."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groves.network/" />
        <meta property="og:image" content="https://groves.network/og-image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://groves.network/" />
        <meta property="twitter:title" content="Groves — Your workspace for visual thinking." />
        <meta
          property="twitter:description"
          content="A new tool for thought and visual organization. Create your own digital garden with a workspace for connecting, visualizing, and growing your ideas."
        />
        <meta property="twitter:image" content="https://groves.network/og-image.png"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var t=analytics.methods[e];analytics[t]=analytics.factory(t)}analytics.load=function(e,t){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+e+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=t};analytics.SNIPPET_VERSION="4.1.0";
              analytics.load("4TeWCt1kFP32yi2z02MP0yLhXaDjECqs");
              }}();
            `
          }}
        />
      </Head>

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
              <Component {...pageProps} />
            </WorkspaceProvider>
          </ThemeProvider>
        )}
      </AuthProvider>
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
