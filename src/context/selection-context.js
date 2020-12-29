import { NetworkStatus, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useState } from 'react';
import Loading from '~/src/components/Loader';
import withApollo from '~/src/lib/withApollo';
import { CHANNEL_SKELETON } from '~/src/queries';

const SelectionContext = createContext();

const SelectionProvider = withApollo((props) => {
  const router = useRouter();

  const [selectedChannel, setSelectedChannel] = useState(null);

  const [selectedConnection, setSelectedConnection] = useState(null);

  const [selectedRef, setSelectedRef] = useState(null);

  const getChannelID = () => {
    if (selectedChannel && selectedChannel.id) {
      return selectedChannel.id;
    } else if (router.query.grove) {
      return router.query.grove;
    } else {
      return '757665';
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
        setSelectedRef
      }}
      {...props}
    />
  );
});

const useSelection = () => useContext(SelectionContext);

export { useSelection, SelectionProvider, SelectionContext };
