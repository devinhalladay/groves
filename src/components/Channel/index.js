import { useLazyQuery, useMutation } from '@apollo/client';
import React from 'react';
import { CREATE_CHANNEL, DELETE_CHANNEL, UPDATE_CHANNEL } from '~/src/graphql/mutations';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';

const withChannel = (props) => (WrappedComponent) => () => {
  // const { apollo } = props;

  const [
    loadChannelSkeleton,
    { called: calledChannelSkeleton, loading: loadingChannelSkeleton, data: channelSkeleton }
  ] = useLazyQuery(CHANNEL_SKELETON, {
    fetchPolicy: 'no-cache'
  });

  const getChannelSkeleton = async (channelId, onSuccess, onError) => {
    await loadChannelSkeleton({
      variables: {
        channelId: channelId
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
    createChannelMutation,
    { loading: creatingChannel, error: errorCreatingChannel }
  ] = useMutation(CREATE_CHANNEL, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const createChannel = async (channel, onSuccess, onError) => {
    console.log(channel);
    await createChannelMutation({
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
      getChannelSkeleton={getChannelSkeleton}
      {...props}
    />
  );
};

export default withChannel;
