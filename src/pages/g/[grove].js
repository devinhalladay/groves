import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useSelection } from '@context/selection-context';
import GrovesCanvas from '~/src/components/Canvas';
import { parseCookies } from 'nookies';
import Layout from '~/src/components/Layout';
import { useState, useCallback, useEffect } from 'react';
import withApollo from '~/src/lib/withApollo';
import { gql, NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import DraggableBlock from '~/src/components/Block';
import { useWorkspace, WorkspaceContext, WorkspaceProvider } from '@context/workspace-context';
import SelectionPanel from '~/src/components/SelectionPanel';
import { useDropzone } from 'react-dropzone';
// import { ADD_BLOCK } from '~/src/graphql/mutations';
import createBlock from '~/src/components/Block/mutations/createBlock'
import { useMutation } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Grid from '~/src/components/Formations/components/Grid';

const Grove = (props) => {
  const router = useRouter();

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000
  });

  const { canvasBlocks, setCanvasBlocks } = useSelection();

  const { apollo } = props;

  const { workspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  const {
    selectedConnection,
    setSelectedConnection,
    selectedRef,
    setSelectedRef,
    selectedChannel,
    initialSelection
  } = useSelection();

  const [files, setFiles] = useState([]);

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

  // const onDrop = useCallback((acceptedFiles) => {
  //   acceptedFiles.map(async (file) => {
  //     setFiles(
  //       files.concat(
  //         Object.assign(file, {
  //           block: {
  //             __typename: "Image",
  //             description: null,
  //             title: file.name,
  //             id: router.query.grove,
  //             image_url: URL.createObjectURL(file),
  //           },
  //         })
  //       )
  //     );

  //     const res = await fetch(
  //       `${process.env.APPLICATION_API_CALLBACK}/${process.env.APPLICATION_API_PATH}/add-block`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //         body: JSON.stringify({
  //           path: file.path,
  //           type: file.type,
  //           name: file.name,
  //         }),
  //       }
  //     );

  //     res.json().then(({ signedRequest, url }) => {
  //       fetch(signedRequest, {
  //         method: "PUT",
  //         body: file,
  //         headers: {
  //           "Content-Type": file.type,
  //         },
  //       }).then((res) => {
  //         console.log(res);

  //         connectBlock({
  //           variables: {
  //             channelId: router.query.grove,
  //             value: url,
  //           },
  //         });
  //       });
  //     });
  //   });
  // }, []);

  // const {
  //   getRootProps,
  //   getInputProps,
  // } = useDropzone({
  //   onDrop,
  //   noClick: true,
  // });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.block.image_url));
    },
    [files]
  );

  const renderFormation = (formation) => {
    if (formation === 'canvas') {
      return (
        <Layout {...props}>
          <GrovesCanvas {...props}>
            {canvasBlocks.length ? (
              canvasBlocks.map((blokk, i) => (
                <>
                  <DraggableBlock
                    title={blokk.title ? blokk.title : null}
                    type={blokk.__typename}
                    dragStates={dragStates}
                    setDragStates={setDragStates}
                    panZoomRef={props.panZoomRef}
                    key={blokk.id}
                    block={blokk}
                    bounds="window"
                    {...props}
                  />
                </>
              ))
            ) : (
              <div>not found</div>
            )}

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
          </GrovesCanvas>
        </Layout>
      );
    } else if (formation === 'grid') {
      if (selectedChannel && selectedChannel.channel) {
        return <Grid blocks={selectedChannel.channel.initial_contents} />;
      } else {
        return <Grid blocks={initialSelection.channel.initial_contents} />;
      }
    }
  };

  return (
    <>
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
    </>
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
