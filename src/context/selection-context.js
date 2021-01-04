import { NetworkStatus, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useState } from 'react';
import Loading from '~/src/components/Loader';
import withApollo from '~/src/hooks/withApollo';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';

const SelectionContext = createContext();

const SelectionProvider = withApollo((props) => {
  const router = useRouter();

  const [selectedChannel, setSelectedChannel] = useState(null);

  const [canvasBlocks, setCanvasBlocks] = useState([]);

  const [selectedConnection, setSelectedConnection] = useState(null);

  const [selections, setSelections] = useState([]);

  const [selectedRef, setSelectedRef] = useState(null);

  const getChannelID = () => {
    if (selectedChannel && selectedChannel.id) {
      return selectedChannel.id;
    } else if (router.query.grove) {
      return router.query.grove;
    } else {
      console.log('landing');
      return '924348';
    }
  };

  const { loading, error, data: channelSkeleton, refetch, networkStatus } = useQuery(
    CHANNEL_SKELETON,
    {
      variables: {
        channelId: getChannelID()
      },
      fetchPolicy: 'no-cache',
      client: props.apollo
    }
  );

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

  if (loading) {
    return <Loading fullScreen="true" description={'Loading your Grove :)'} />;
  } else if (error) {
    console.error(error);
    return `Error: ${error}`;
  }

  let initialSelection = channelSkeleton;

  return (
    <SelectionContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel,
        initialSelection,
        selectedConnection,
        setSelectedConnection,
        selectedRef,
        setSelectedRef,
        canvasBlocks,
        setCanvasBlocks,
        selections,
        setSelections
      }}
      {...props}
    />
  );
});

const useSelection = () => useContext(SelectionContext);

export { useSelection, SelectionProvider, SelectionContext };
