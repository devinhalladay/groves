import { Button } from '@blueprintjs/core';
import { useWorkspace, WorkspaceProvider } from '@context/workspace-context';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import withChannel from '~/src/components/Channel';
import ChannelIndex from '~/src/components/Formations/components/ChannelIndex';
import Grid from '~/src/components/Formations/components/Grid';
import KeyMapDialog from '~/src/components/KeyMapDialog';
import SelectionPanel from '~/src/components/SelectionPanel';
import Formations from '~/src/constants/Formations';
import { useUser } from '~/src/context/user-context';
import withApollo from '~/src/hooks/withApollo';

const Grove = () => {
  const { workspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  const { flatIndex } = useUser();

  if (!flatIndex.length) {
    return (
      <div className={`loading-screen fullscreen`}>
        <p className="pb-4">
          Welcome to Groves. Create a new channel to begin.
        </p>
        <Button icon="new-grid-item" text="New channel" />
      </div>
    );
  } else {
    return (
      <>
        <SelectionPanel />
        <KeyMapDialog />
        {formation === Formations.GRID ? (
          <Grid blocks={flatIndex} />
        ) : formation === Formations.CHANNEL_INDEX ? (
          <ChannelIndex />
        ) : null}
      </>
    );
  }
};

export default withApollo(withChannel()(Grove));
