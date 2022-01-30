import { useQuery } from '@apollo/client';
import Grid from '@components/Formations/components/Grid';
import { useSelection } from '@context/selection-context';
import { useWorkspace } from '@context/workspace-context';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import GrovesCanvas from '~/src/components/Canvas';
import CanvasContextMenu from '~/src/components/CanvasContextMenu';
import withChannel from '~/src/components/Channel';
import ChannelIndex from '~/src/components/Formations/components/ChannelIndex';
import MillerPanel from '~/src/components/Formations/components/MillerPanel';
import KeyMapDialog from '~/src/components/KeyMapDialog';
import Loading from '~/src/components/Loader';
import SelectionPanel from '~/src/components/SelectionPanel';
import Formations from '~/src/constants/Formations';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';
import withApollo from '~/src/hooks/withApollo';
import { addApolloState, initializeApollo } from '~/src/lib/apolloClient';
import { withAuthSync } from '~/src/utils/auth';

const Grove = ({ data, initialSelection, ...props }) => {
  const { apollo } = props;

  const { workspaceOptions, setWorkspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  const { selectedConnection, channelID } = useSelection();

  const {
    loading,
    error,
    data: channelSkeleton,
    fetchMore,
    networkStatus,
  } = useQuery(CHANNEL_SKELETON, {
    variables: { channelId: channelID },
    fetchPolicy: 'no-cache',
    client: apollo,
  });

  const renderFormation = (formation) => {
    if (loading) {
      return <Loading fullScreen="true" description="Loading blocks..." />;
    }

    if (formation.key === Formations.CANVAS.key) {
      return (
        <>
          {selectedConnection && <SelectionPanel />}
          <CanvasContextMenu>
            <GrovesCanvas {...props} />
          </CanvasContextMenu>
        </>
      );
    } else if (formation.key === Formations.GRID.key) {
      if (channelSkeleton && channelSkeleton.channel) {
        return (
          <div className="workspace">
            <SelectionPanel key={formation.key} />
            {/* <CanvasContextMenu> */}
            <Grid blocks={channelSkeleton.channel.initial_contents} />
            {/* </CanvasContextMenu> */}
          </div>
        );
      }
    } else if (formation.key === Formations.CHANNEL_INDEX.key) {
      return <ChannelIndex />;
    } else if (formation.key === Formations.FOLDERS.key) {
      return (
        <div className="workspace">
          <SelectionPanel key={formation.key} />
          <MillerPanel blocks={channelSkeleton.channel.initial_contents} />
        </div>
      );
    } else {
      return <div>Error</div>;
    }
  };

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
      />

      <KeyMapDialog />

      {renderFormation(formation)}
    </div>
  );
};

export async function getInitialProps(context) {
  const cookies = nookies.get(context);

  if (!cookies.access_token) {
    context.res.writeHead(301, { Location: '/' });
    context.res.end();
  }

  const apolloClient = initializeApollo(cookies.access_token);

  const channelId = context.query.grove;

  const res = await apolloClient.query({
    query: CHANNEL_SKELETON,
    variables: {
      channelId: channelId,
    },
  });

  return addApolloState(apolloClient, {
    props: { initialSelection: res.data },
  });
}

export default withApollo(withAuthSync(Grove));
