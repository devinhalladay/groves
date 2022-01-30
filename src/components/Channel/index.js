import { useMutation } from '@apollo/client';
import React from 'react';
import { CREATE_CHANNEL, DELETE_CHANNEL, UPDATE_CHANNEL } from '~/src/graphql/mutations';

const withChannel = (props) => (WrappedComponent) => () => {
  const [createChannelMutation, { loading: creatingChannel, error: errorCreatingChannel }] =
    useMutation(CREATE_CHANNEL, {
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
        ...channel
      }
    })
      .then((data) => {
        onSuccess && onSuccess(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
        onError && onError(error);
        return error;
      });
  };

  const [updateChannelMutation, { loading: updatingChannel, error: errorUpdatingChannel }] =
    useMutation(UPDATE_CHANNEL, {
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

  const [deleteChannelMutation, { loading: deletingChannel, error: errorDeletingChannel }] =
    useMutation(DELETE_CHANNEL, {
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
      {...props}
    />
  );
};

export default withChannel;
