import Tippy from '@tippyjs/react';
import { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import { useCombobox } from 'downshift';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEARCH_ALL_CHANNELS } from '~/src/graphql/queries';
import { useUser } from '../../../context/user-context';
import { useRouter } from 'next/router';
import { CREATE_CONNECTION } from '~/src/graphql/mutations';
import createBlock from '~/src/components/Block/mutations/createBlock';
import { ToastContainer, toast } from 'react-toastify';
import { useSelection } from '../../../context/selection-context';
import { useDropzone } from 'react-dropzone';
import { Button, Colors, Popover, TextArea } from '@blueprintjs/core';
import ActionIcon from '~/public/create-block.svg';
import { useTheme } from '~/src/context/theme-provider';

const CreateBlock = (props) => {
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState([]);

  const { theme } = useTheme();

  const { apollo } = props;

  const show = () => setVisible(true);
  const hide = () => {
    setVisible(false);
    setCreateState('omni');
  };

  const router = useRouter();

  const ActionButton = forwardRef((props, ref) => (

      <Button ref={ref} className="action" onClick={visible ? hide : show}>
        <ActionIcon
          fill={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
          stroke={theme === 'dark' ? Colors.WHITE : Colors.GRAY1}
        />
      </Button>

  ));

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // const { selectedConnection, setSelectedConnection } = useSelection();

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
              image_url: URL.createObjectURL(file)
            }
          })
        )
      );

      const res = await fetch(
        `${process.env.APPLICATION_API_CALLBACK}/${process.env.APPLICATION_API_PATH}/add-block`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            path: file.path,
            type: file.type,
            name: file.name
          })
        }
      );

      res.json().then(({ signedRequest, url }) => {
        fetch(signedRequest, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type
          }
        }).then((res) => {
          console.log(res);

          newBlock({
            variables: {
              channelId: router.query.grove,
              value: url
            }
          });
        });
      });
    });
  }, []);

  const onSubmit = (value) => {
    createBlock({
      variables: {
        channelId: router.query.grove,
        value: value
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true
  });

  const inputElement = useRef(null);

  const [createState, setCreateState] = useState('omni');

  const connectedToast = (connectable) => {
    toast(`Connected to ${connectable.title}`);
  };

  const [newBlock, { loading: mutationLoading, error: mutationError }] = useMutation(createBlock, {
    client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const replaceWithTextbox = () => {
    setCreateState('text');
  };

  return (
    // <Tippy
    //   interactive={true}
    //   interactiveBorder={20}
    //   arrow={false}
    //   placement="bottom-end"
    //   delay={100}
    //   content={

    //   }
    //   visible={visible}
    //   onClickOutside={hide}>

    // </Tippy>

    <Popover
      position="bottom"
      modifiers={{
        arrow: { enabled: false }
      }}
      style={{
        padding: 15
      }}>
      <ActionButton />
      <section>
        <p className="section__title">Create a new block</p>
        <div {...getRootProps()} onClick={replaceWithTextbox}>
          {createState === 'text' ? (
            <TextArea
              onSubmit={() => onSubmit}
              fill={true}
              placeholder="Type here in Markdown…"
              style={{
                height: 200
              }}
              autoFocus
            />
          ) : (
            <>
              <input {...getInputProps()} />
              <div
                style={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  background: 'rgba(211, 211, 211, 0.27)'
                }}>
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </Popover>
  );
};

export default CreateBlock;
