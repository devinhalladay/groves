import React from 'react';
import Layout from '~/src/components/Layout';
import { parseCookies } from 'nookies';
import GrovesCanvas from '~/src/components/Canvas';
import { useSelection } from '@context/selection-context';
import { useAuth } from '@context/auth-context';

const GrovesApp = (props) => {
  const { selectedChannel } = useSelection();
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <p>Loading</p>;
  }

  return <Layout {...props}>{selectedChannel && <GrovesCanvas />}</Layout>;
};

export async function getServerSideProps(context) {
  if (!parseCookies(context)['access_token']) {
    context.res.writeHead(301, { Location: '/' });
    context.res.end();
  }

  return { props: {} };
}

export default GrovesApp;
