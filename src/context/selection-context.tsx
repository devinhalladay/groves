import { useRouter } from 'next/router';
import React, { createContext, useContext, useState } from 'react';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '../types';

const SelectionContext = createContext(null);

const SelectionProvider = withApollo((props): any => {
  const router = useRouter();

  const [selectedChannel, setSelectedChannel] =
    useState<Ervell.ConnectableBlokk_blokk_Channel>(null);

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

  let initialSelection = null;

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
