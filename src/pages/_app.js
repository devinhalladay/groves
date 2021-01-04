import '~/public/style.scss';
import '~/public/slider.scss';
import '~/public/tippy.scss';
import '~/public/toastify/main.scss';

import React, { useEffect } from 'react';
import { AuthProvider } from '../context/auth-context';
import { UserProvider } from '../context/user-context';
import { parseCookies } from 'nookies';
import Head from 'next/head';
import { AuthenticatedHeader, UnauthenticatedHeader } from '~/src/components/Header';
import { WorkspaceProvider } from '../context/workspace-context';
import { ThemeProvider } from '../context/theme-provider';
import { HotKeys } from 'react-hotkeys';

const GrovesClient = ({ Component, pageProps, isAuthenticated }) => {
  useEffect(() => {
    analytics.page();
  }, []);

  if (isAuthenticated) {
    return (
      <div>
        <Head>
          <title>Groves — Relational Browsing for Are.na</title>
          <meta name="title" content="Groves — Relational Browsing for Are.na" />
          <meta
            name="description"
            content="Groves is a relational browsing experience for Are.na that allows users to visualize and explore connections in novel ways, expanding their thinking and creativity."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://groves.network/" />
          <meta property="og:title" content="Groves — Relational Browsing for Are.na" />
          <meta
            property="og:description"
            content="Groves is a relational browsing experience for Are.na that allows users to visualize and explore connections in novel ways, expanding their thinking and creativity."
          />
          <meta property="og:image" content="https://groves.network/og-image.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://groves.network/" />
          <meta property="twitter:title" content="Groves — Relational Browsing for Are.na" />
          <meta
            property="twitter:description"
            content="Groves is a relational browsing experience for Are.na that allows users to visualize and explore connections in novel ways, expanding their thinking and creativity."
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
          <UserProvider>
            <ThemeProvider>
              <WorkspaceProvider>
                <AuthenticatedHeader {...pageProps} />
                <Component {...pageProps} />
              </WorkspaceProvider>
            </ThemeProvider>
          </UserProvider>
        </AuthProvider>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Groves — Relational Browsing for Are.na</title>
        <meta name="title" content="Groves — Relational Browsing for Are.na" />
        <meta
          name="description"
          content="Groves is a relational browsing experience for Are.na that allows users to visualize and explore connections in novel ways, expanding their thinking and creativity."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://groves.network/" />
        <meta property="og:title" content="Groves — Relational Browsing for Are.na" />
        <meta
          property="og:description"
          content="Groves is a relational browsing experience for Are.na that allows users to visualize and explore connections in novel ways, expanding their thinking and creativity."
        />
        <meta property="og:image" content="https://groves.network/og-image.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://groves.network/" />
        <meta property="twitter:title" content="Groves — Relational Browsing for Are.na" />
        <meta
          property="twitter:description"
          content="Groves is a relational browsing experience for Are.na that allows users to visualize and explore connections in novel ways, expanding their thinking and creativity."
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
        <div>
          <UnauthenticatedHeader {...pageProps} />
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </div>
  );
};

GrovesClient.getInitialProps = ({ ctx }) => {
  if (parseCookies(ctx)['access_token']) {
    return { isAuthenticated: true };
  }

  return { isAuthenticated: false };
};

export default GrovesClient;
