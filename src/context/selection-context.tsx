import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from 'react';
import Loading from '~/src/components/Loader';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '../types';

const SelectionContext = createContext(null);

const SelectionProvider = withApollo((props): any => {
  const router = useRouter();

  const [selectedChannel, setSelectedChannel] =
    useState<Ervell.ConnectableBlokk>(null);

  const [canvasBlocks, setCanvasBlocks] = useState([]);

  const [selectedConnection, setSelectedConnection] =
    useState<Ervell.ConnectableBlokk>(null);

  const [selections, setSelections] = useState([]);

  const [selectedRef, setSelectedRef] = useState(null);

  const getChannelID = () => {
    if (selectedChannel && selectedChannel.id) {
      return selectedChannel.id;
    } else if (router.query.grove) {
      return router.query.grove;
    } else {
      return null;
    }
  };

  const channelID = getChannelID();

  const [loadSkeleton, { called, loading, data: channelSkeleton }] =
    useLazyQuery(CHANNEL_SKELETON, {
      variables: {
        id: channelID,
      },
      client: props.apollo,
    });

  if (typeof loading !== 'undefined' && loading == true) {
    return <Loading fullScreen="true" description={'Loading your Grove :)'} />;
  } else if (typeof error !== 'undefined' && error !== null) {
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
        channelID,
        selections,
        setSelections,
      }}
      {...props}
    />
  );
});

const useSelection = () => useContext(SelectionContext);

export { useSelection, SelectionProvider, SelectionContext };
