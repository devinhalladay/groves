import { ApolloClient, useMutation, useQuery } from '@apollo/client';
import Grid from '@components/Formations/components/Grid';
import { useSelection } from '@context/selection-context';
import { useWorkspace } from '@context/workspace-context';
import { useRouter } from 'next/router';
import nookies, { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import DraggableBlock from '~/src/components/Block';
// import { ADD_BLOCK } from '~/src/graphql/mutations';
// import { useWorkspace } from '@context/workspace-context';
import createBlock from '~/src/components/Block/mutations/createBlock';
import GrovesCanvas from '~/src/components/Canvas';
import ChannelIndex from '~/src/components/Formations/components/ChannelIndex';
import KeyMapDialog from '~/src/components/KeyMapDialog';
import Layout from '~/src/components/Layout';
import withApollo from '~/src/hooks/withApollo';
import { withAuthSync } from '~/src/utils/auth';
import { Button } from '@blueprintjs/core';
import { LookoutVision } from 'aws-sdk';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';
import { initializeApollo, addApolloState } from '~/src/lib/apolloClient';

const Grove = ({ data, initialSelection, ...props }) => {
  const router = useRouter();

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000
  });

  const { canvasBlocks, setCanvasBlocks } = useSelection();

  const { apollo } = props;

  const { workspaceOptions, formations, setWorkspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  const {
    selectedConnection,
    setSelectedConnection,
    selectedRef,
    setSelectedRef,
    selectedChannel,
    channelID
  } = useSelection();

  const [files, setFiles] = useState([]);

  const { loading, error, data: channelSkeleton, fetchMore, networkStatus } = useQuery(CHANNEL_SKELETON, {
    variables: { channelId: channelID },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    client: apollo,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true
  });

  const [connectBlock, { loading: mutationLoading, error: mutationError }] = useMutation(
    createBlock,
    {
      client: apollo,
      onCompleted: (data) => {
        console.log(data);
        setFiles([]);
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  const _switchToGridFormation = () => {
    setWorkspaceOptions({
      ...workspaceOptions,
      formation: formations.GRID
    });
  };

  const renderFormation = (formation) => {
    if (formation.key === formations.CANVAS.key) {
      if (canvasBlocks && canvasBlocks.length > 0) {
        return (
          <Layout {...props}>
            <GrovesCanvas {...props}>
              <div className="canvas-container">
                {canvasBlocks.map((block, i) => (
                  <>
                    <DraggableBlock
                      title={block.title ? block.title : null}
                      type={block.__typename}
                      dragStates={dragStates}
                      setDragStates={setDragStates}
                      panZoomRef={props.panZoomRef}
                      key={block.id}
                      block={block}
                      bounds="window"
                      {...props}
                    />
                  </>
                ))}
                {files.map((file) => (
                  <>
                    <DraggableBlock
                      title={file.block.title}
                      type={file.block.__typename}
                      dragStates={dragStates}
                      setDragStates={setDragStates}
                      key={file.block.id}
                      block={file.block}
                      bounds="window"
                      {...props}
                    />
                  </>
                ))}
              </div>
            </GrovesCanvas>
          </Layout>
        );
      } else {
        return (
          <div className={`loading-screen fullscreen`}>
            <p
              style={{
                marginBottom: 20
              }}>
              You can blocks to your canvas using the Grid View.
            </p>
            <Button onClick={_switchToGridFormation} icon={formations.GRID.icon}>
              Switch to Grid View
            </Button>
          </div>
        );
      }
    } else if (formation.key === formations.GRID.key) {
      if (selectedChannel && selectedChannel.channel) {
        return <Grid blocks={selectedChannel.channel.initial_contents} />;
      } else if (channelSkeleton && channelSkeleton.channel) {
        return <Grid blocks={channelSkeleton.channel.initial_contents} />;
      }
    } else if (formation.key === formations.CHANNEL_INDEX.key) {
      return <ChannelIndex />;
    }
  };

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />

      {renderFormation(formation)}
      <KeyMapDialog />
    </div>
  );
};

export async function getServerSideProps(context) {
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
      channelId: channelId
    }
  });

  return addApolloState(apolloClient, {
    props: { initialSelection: res.data }
  });
}

export default withApollo(withAuthSync(Grove));
