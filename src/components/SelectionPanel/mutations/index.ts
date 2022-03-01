import { useMutation } from '@apollo/client';
import {
  CREATE_CONNECTION,
  REMOVE_CONNECTION,
  UPDATE_CHANNEL,
  UPDATE_CONNECTION,
} from '~/src/graphql/mutations';

export const useChannelMutation = () => {
  const [
    updateChannel,
    { loading: updatingChannel, error: errorUpdatingChannel },
  ] = useMutation(UPDATE_CHANNEL, {
    // client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { updateChannel };
};

export const useConnectionMutation = () => {
  const [
    updateConnection,
    { loading: updatingConnection, error: errorUpdatingConnection },
  ] = useMutation(UPDATE_CONNECTION, {
    // client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [
    removeConnection,
    { loading: removingConnection, error: errorRemovingConnection },
  ] = useMutation(REMOVE_CONNECTION, {
    // client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [
    createConnection,
    { loading: creatingConnection, error: errorCreatingConnection },
  ] = useMutation(CREATE_CONNECTION, {
    // client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { createConnection, updateConnection, removeConnection };
};
