import { useQuery } from '@apollo/client';
import React, { createContext, useContext } from 'react';
import Loading from '~/src/components/Loader';
import { SelectionProvider } from '@context/selection-context';
import withApollo from '~/src/hooks/withApollo';
import { CURRENT_USER } from '~/src/graphql/queries';

const UserContext = createContext();

export const UserProvider = withApollo((props) => {
  const {
    loading: loadingCurrentUser,
    error: errorLoadingCurrentUser,
    data: currentUser,
  } = useQuery(CURRENT_USER);

  if (loadingCurrentUser) {
    return <Loading fullScreen="true" description="Authenticating..." />;
  } else if (errorLoadingCurrentUser) {
    console.error(errorLoadingCurrentUser);
    return `Error: ${errorLoadingCurrentUser}`;
  }

  const channels = currentUser.me.channels;

  let index = currentUser.me.channels_index;

  let flatIndex = index.flatMap((channelSet) =>
    channelSet.channels.flatMap((c) => c),
  );

  return (
    <UserContext.Provider
      value={{ currentUser, channels, index, flatIndex }}
      {...props}
    >
      <SelectionProvider>{props.children}</SelectionProvider>
    </UserContext.Provider>
  );
});

export const useUser = () => useContext(UserContext);
