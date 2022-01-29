import { useWorkspace, WorkspaceProvider } from '@context/workspace-context';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useRef } from 'react';
import withChannel from '~/src/components/Channel';
import ChannelIndex from '~/src/components/Formations/components/ChannelIndex';
import Grid from '~/src/components/Formations/components/Grid';
import KeyMapDialog from '~/src/components/KeyMapDialog';
import SelectionPanel from '~/src/components/SelectionPanel';
import Formations from '~/src/constants/Formations';
import { useSelection } from '~/src/context/selection-context';
import { useUser } from '~/src/context/user-context';
import withApollo from '~/src/hooks/withApollo';
import { withAuthSync } from '~/src/utils/auth';

const Grove = (props) => {
  const router = useRouter();

  const { createChannel } = props;
  const { workspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  const {
    selectedChannel,
    setSelectedChannel
    // initialSelection,
    // selectedConnection,
    // setSelectedConnection,
    // selectedRef,
    // setSelectedRef,
    // canvasBlocks,
    // setCanvasBlocks,
    // channelID,
    // selections,
    // setSelections
  } = useSelection();

  const nameInput = useRef(null);

  const { flatIndex } = useUser();

  const handleCreateChannel = async () => {
    const val = nameInput.current.value;
    await createChannel(
      { title: val },
      (res) => {
        setSelectedChannel(res.data.create_channel.channel);
        router.push(`/g/[grove]`, `/g/${res.data.create_channel.channel.id}`, { shallow: true });
      },
      (error) => console.log(error)
    );
  };

  return (
    <WorkspaceProvider>
      <SelectionPanel />
      <KeyMapDialog />
      {formation.key === Formations.GRID.key && <Grid blocks={flatIndex} />}
      {formation.key === Formations.CHANNEL_INDEX.key && <ChannelIndex />}
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
