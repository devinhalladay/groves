import { useMutation } from '@apollo/client';
import { Button, Colors, Intent, TextArea } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { useRouter } from 'next/router';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import ActionIcon from '~/public/icons/create-block.svg';
import createBlock from '~/src/components/Block/mutations/createBlock';

import { useTheme } from 'next-themes';
import Themes from '~/src/constants/Themes';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';

const CreateBlock = (props) => {
  const [files, setFiles] = useState([]);

  const { theme } = useTheme();

  const router = useRouter();

  const ActionButton = forwardRef((props, ref) => (
    <Button ref={ref} minimal={true} className="action">
      <ActionIcon
        fill={theme === Themes.DARK ? Colors.WHITE : Colors.GRAY1}
        stroke={theme === Themes.DARK ? Colors.WHITE : Colors.GRAY1}
      />
    </Button>
  ));

  ActionButton.displayName = 'CreateBlock';

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map(async (file) => {
      setFiles(
        files.concat(
          Object.assign(file, {
            block: {
              __typename: 'Image',
              description: null,
              title: file.name,
              id: router.query.grove,
              image_url: URL.createObjectURL(file),
            },
          }),
        ),
      );

      const res = await fetch(
        `${process.env.APPLICATION_API_CALLBACK}/${process.env.APPLICATION_API_PATH}/add-block`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            path: file.path,
            type: file.type,
            name: file.name,
          }),
        },
      );

      res.json().then(({ signedRequest, url }) => {
        fetch(signedRequest, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        }).then((res) => {
          newBlock({
            variables: {
              id: router.query.grove,
              value: url,
            },
          });
        });
      });
    });
  }, []);

  const inputElement = useRef(null);

  const onSubmit = (value) => {
    newBlock({
      variables: {
        id: router.query.grove,
        value: inputElement.current.value,
      },
      optimisticResponse: true,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  const [createState, setCreateState] = useState('omni');

  const connectedToast = (connectable) => {
    toast(`Connected to ${connectable.title}`);
  };

  const [newBlock, { loading: mutationLoading, error: mutationError }] =
    useMutation(createBlock, {
      refetchQueries: [CHANNEL_SKELETON],
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const replaceWithTextbox = () => {
    setCreateState('text');
  };

  return (
    <Popover2
      position="bottom"
      content={
        <section style={{ padding: 15, width: 280, paddingTop: 25 }}>
          <p style={{ marginBottom: 15 }}>
            <strong>Create a new block</strong>
          </p>
          <div {...getRootProps()} onClick={replaceWithTextbox}>
            {createState === 'text' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  outline: 'none',
                }}
              >
                <TextArea
                  fill={true}
                  placeholder="Type here in Markdown…"
                  style={{
                    height: 250,
                    resize: 'none',
                    marginBottom: 15,
                  }}
                  autoFocus
                  inputRef={inputElement}
                />
                <div
                  style={{
                    display: 'flex',
                    flex: 0,
                    justifyContent: 'space-between',
                  }}
                >
                  <Button>Cancel</Button>
                  <Button intent={Intent.PRIMARY} icon="add" onClick={onSubmit}>
                    Create Block
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <input {...getInputProps()} />
                <div
                  style={{
                    height: 250,
                    width: 250,
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    background: 'rgba(211, 211, 211, 0.27)',
                    outline: 'none',
                  }}
                >
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Drag a file here, or click to write some text.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      }
      style={{
        padding: 15,
      }}
    >
      <ActionButton />
    </Popover2>
  );
};

export default CreateBlock;
