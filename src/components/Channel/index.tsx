import { useMutation } from '@apollo/client';
import React from 'react';
import {
  CREATE_CHANNEL,
  DELETE_CHANNEL,
  UPDATE_CHANNEL,
} from '~/src/graphql/mutations';
import { Ervell } from '~/src/types';
import { GET_SKELETON } from './queries/getSkeleton';

const withChannel =
  (props?) => (WrappedComponent) => (WrappedComponentProps) => {
    const [
      createChannelMutation,
      { loading: creatingChannel, error: errorCreatingChannel },
    ] = useMutation<
      Ervell.createChannelMutation,
      Ervell.createChannelMutationVariables
    >(CREATE_CHANNEL, {
      refetchQueries: [GET_SKELETON],
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

    const createChannel = async (
      channel: Ervell.createChannelMutationVariables,
      onSuccess: (data: Ervell.createChannelMutation) => void,
      onError: (error: any) => void,
    ) => {
      await createChannelMutation({
        variables: {
          ...channel,
        },
      })
        .then((res) => {
          onSuccess && onSuccess(res.data);
          return res.data;
        })
        .catch((error) => {
          console.error(error);
          onError && onError(error);
          return error;
        });
    };

    const [
      updateChannelMutation,
      { loading: updatingChannel, error: errorUpdatingChannel },
    ] = useMutation<
      Ervell.updateChannelMutation,
      Ervell.updateChannelMutationVariables
    >(UPDATE_CHANNEL, {
      onCompleted: (data) => {
        console.log(data);
        return data;
      },
      onError: (error) => {
        console.log(error);
      },
    });

    const updateChannel = async (channel, onSuccess, onError) => {
      await updateChannelMutation({
        variables: {
          ...channel,
        },
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
      { loading: deletingChannel, error: errorDeletingChannel },
    ] = useMutation<
      Ervell.deleteChannelMutation,
      Ervell.deleteChannelMutationVariables
    >(DELETE_CHANNEL, {
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

    const deleteChannel = async (channel, onSuccess, onError) => {
      await deleteChannelMutation({
        variables: {
          id: channel.id,
        },
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
        {...WrappedComponentProps}
      />
    );
  };

export default withChannel;
