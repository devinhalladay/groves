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

const Grove = (props) => {
  const router = useRouter();

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000
  });

  const { initialSelection, selectedChannel, setSelectedChannel } = useSelection();

  return (
    <WorkspaceProvider>
      <Layout {...props}>
        <GrovesCanvas {...props}>
          {selectedChannel && selectedChannel.channel
            ? selectedChannel.channel.initial_contents.map((blokk, i) => {
                return (
                  <DraggableBlock
                    title={blokk.title ? blokk.title : null}
                    type={blokk.__typename}
                    dragStates={dragStates}
                    setDragStates={setDragStates}
                    key={blokk.id}
                    block={blokk}
                    {...props}
                  />
                );
              })
            : initialSelection.channel.initial_contents.map((blokk, i) => {
                return (
                  <DraggableBlock
                    title={blokk.title ? blokk.title : null}
                    type={blokk.__typename}
                    dragStates={dragStates}
                    setDragStates={setDragStates}
                    key={blokk.id}
                    block={blokk}
                    {...props}
                  />
                );
              })}
        </GrovesCanvas>
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

export default withApollo(Grove);
