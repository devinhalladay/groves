import { useQuery } from '@apollo/client';
import { SelectionProvider } from '@context/selection-context';
import React, { createContext, useContext } from 'react';
import Loading from '~/src/components/Loader';
import { CURRENT_USER } from '~/src/graphql/queries';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '../types';

const UserContext = createContext(null);

export interface IUserContext {
  me: Ervell.ProfileChannelIndex;
}

type UserContext = {
  currentUser: IUserContext;
  index: Ervell.ProfileChannelIndex_User_channels_index[] | null;
  flatIndex: Ervell.ProfileChannelIndex_User_channels_index_channels;
};

export const UserProvider = withApollo((props): any => {
  const {
    loading: loadingCurrentUser,
    error: errorLoadingCurrentUser,
    data: currentUser,
  } = useQuery<IUserContext>(CURRENT_USER);

  if (loadingCurrentUser) {
    return <Loading fullScreen={true} description="Authenticating..." />;
  } else if (errorLoadingCurrentUser) {
    console.error(errorLoadingCurrentUser);
    return `Error: ${errorLoadingCurrentUser}`;
  }

  let index = currentUser.me.channels_index;

  let flatIndex = index.flatMap((channelSet) =>
    channelSet.channels.flatMap((c) => c),
  );

  return (
    <UserContext.Provider value={{ currentUser, index, flatIndex }} {...props}>
      <SelectionProvider>{props.children}</SelectionProvider>
    </UserContext.Provider>
  );
});

export const useUser = () => useContext(UserContext);
