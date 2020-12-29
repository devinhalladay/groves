import React from 'react';
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
import { WorkspaceProvider } from '@context/workspace-context';
import SelectionPanel from '~/src/components/SelectionPanel';
import { useDropzone } from 'react-dropzone';
import { ADD_BLOCK } from '~/src/mutations';
import { useMutation } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

const Grove = (props) => {
  const router = useRouter();

  const [dragStates, setDragStates] = useState({
    maxZIndex: 1000
  });

  const { apollo } = props;

  const {
    selectedConnection,
    setSelectedConnection,
    selectedRef,
    setSelectedRef,
    selectedChannel,
    initialSelection
  } = useSelection();

  const [files, setFiles] = useState([]);

  const [addBlock, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_BLOCK, {
    client: apollo,
    onCompleted: (data) => {
      console.log(data);
      setFiles([]);
    },
    onError: (error) => {
      console.log(error);
    }
  });

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

  //         addBlock({
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

  return (
    <WorkspaceProvider>
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

      <Layout {...props}>
        <GrovesCanvas {...props}>
          {selectedChannel && selectedChannel.channel ? (
            <>
              {/* <input {...getInputProps()} hidden /> */}
              {selectedChannel.channel.initial_contents.map((blokk, i) => {
                return (
                  <>
                    <DraggableBlock
                      title={blokk.title ? blokk.title : null}
                      type={blokk.__typename}
                      dragStates={dragStates}
                      setDragStates={setDragStates}
                      key={blokk.id}
                      block={blokk}
                      bounds="window"
                      panZoomRef={props.panZoomRef}
                      style={{
                        WebkitFilter: 'blur(0)'
                      }}
                      {...props}
                    />
                  </>
                );
              })}
            </>
          ) : (
            initialSelection.channel.initial_contents.map((blokk, i) => {
              return (
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
              );
            })
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
