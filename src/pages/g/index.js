import { useRouter } from 'next/router';
import { useSelection } from '@context/selection-context';
import GrovesCanvas from '~/src/components/Canvas';
import { parseCookies } from 'nookies';
import Layout from '~/src/components/Layout';
import { useState, Fragment, useRef } from 'react';
import withApollo from '~/src/hooks/withApollo';
import { gql, NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client';
import DraggableBlock from '~/src/components/Block';
import { WorkspaceProvider } from '@context/workspace-context';
import { ToastContainer } from 'react-toastify';
import { withAuthSync } from '~/src/utils/auth';
import Formations from '~/src/constants/Formations';
import { Button, InputGroup, Popover } from '@blueprintjs/core';
import { Icons } from '@blueprintjs/icons';
import withChannel from '~/src/components/Channel';

const Grove = (props) => {
  const router = useRouter();

  const { createChannel } = props;

  const nameInput = useRef(null);

  const handleCreateChannel = async () => {
    const val = nameInput.current.value;
    await createChannel(
      { title: val },
      (res) => {
        router.push(`/g/[grove]`, `/g/${res.data.create_channel.channel.id}`, { shallow: true });
      },
      (error) => console.log(error)
    );
  };

  return (
    <WorkspaceProvider>
      <Layout {...props}>
        <div className={`loading-screen fullscreen`}>
          <p
            style={{
              marginBottom: 20
            }}>
            Search for a channel or create a new one.
          </p>

          <Popover
            position="bottom"
            content={
              <section style={{ padding: 15, width: 350, paddingTop: 25 }}>
                <p style={{ marginBottom: 15 }}>
                  <strong>Create a channel</strong>
                </p>
                <InputGroup
                  large={true}
                  fill={true}
                  placeholder="Enter a name for your channel…"
                  leftIcon={Icons.Edit}
                  style={{ marginBottom: 15 }}
                  className="merge-input-disabled"
                  inputRef={nameInput}
                />
                <Button
                  large={true}
                  fill={true}
                  icon={Icons.NewObject}
                  intent="primary"
                  onClick={handleCreateChannel}>
                  Create channel
                </Button>
              </section>
            }>
            <Button
              onClick={() => {
                return null;
              }}
              icon="add">
              Create Channel
            </Button>
          </Popover>
        </div>
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

export default withApollo(withAuthSync(withChannel()(Grove)));
