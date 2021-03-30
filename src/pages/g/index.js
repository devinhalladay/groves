import { useRouter } from 'next/router';
import { useSelection } from '@context/selection-context';
import GrovesCanvas from '~/src/components/Canvas';
import { parseCookies } from 'nookies';
import Layout from '~/src/components/Layout';
import { useState, Fragment } from 'react';
import withApollo from '~/src/hooks/withApollo';
import { gql, NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import DraggableBlock from '~/src/components/Block';
import { WorkspaceProvider } from '@context/workspace-context';
import { ToastContainer } from 'react-toastify';
import { withAuthSync } from '~/src/utils/auth';

const Grove = (props) => {
  const router = useRouter();

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000
  });

  const { initialSelection, selectedChannel, setSelectedChannel } = useSelection();

  return (
    <WorkspaceProvider>
      <Layout {...props}>
        <button>New grove</button>
      </Layout>
    </WorkspaceProvider>
  );
};

export async function getServerSideProps(context) {
  if (!parseCookies(context)['access_token']) {
    context.res.writeHead(301, { Location: '/' });
    context.res.end();
  }

  return {
    props: {}
  };
}

export default withApollo(withAuthSync(Grove));
