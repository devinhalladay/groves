import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { CREATE_CHANNEL, DELETE_CHANNEL, UPDATE_CHANNEL } from '~/src/graphql/mutations';
import React from 'react';
import getSkeleton from './queries/getSkeleton';

const withChannel = (props) => (WrappedComponent) => () => {
  // const { apollo } = props;

  const [
    createChannelMutation,
    { loading: creatingChannel, error: errorCreatingChannel }
  ] = useMutation(CREATE_CHANNEL, {
    // client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const createChannel = async (channel, onSuccess, onError) => {
    await createChannelMutation({
      variables: {
        title: channel.title
      }
    })
      .then((data) => {
        onSuccess && onSuccess(data);
      })
      .catch((error) => {
        console.error(error);
        onError && onError(error);
      });
  };

  const [
    updateChannelMutation,
    { loading: updatingChannel, error: errorUpdatingChannel }
  ] = useMutation(UPDATE_CHANNEL, {
    // client: apollo,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const updateChannel = async (channel, onSuccess, onError) => {
    await updateChannelMutation({
      variables: {
        ...channel
      }
    })
      .then((data) => {
        onSuccess && onSuccess(data);
      })
      .catch((error) => {
        console.error(error);
        onError && onError(error);
      });
  };

  const [
    deleteChannelMutation,
    { loading: deletingChannel, error: errorDeletingChannel }
  ] = useMutation(DELETE_CHANNEL, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const deleteChannel = async (channel, onSuccess, onError) => {
    await deleteChannelMutation({
      variables: {
        id: channel.id
      }
    })
      .then((data) => {
        onSuccess && onSuccess(data);
      })
      .catch((error) => {
        console.error(error);
        onError && onError(error);
      });
  };

  return (
    <WrappedComponent
      createChannel={createChannel}
      updateChannel={updateChannel}
      deleteChannel={deleteChannel}
      // getChannelSkeleton={getChannelSkeleton}
      {...props}
    />
  );
};

export default withChannel;
