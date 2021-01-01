import { useQuery } from '@apollo/client';
import React, { createContext, useContext } from 'react';
import Loading from '~/src/components/Loader';
import { SelectionProvider } from '@context/selection-context';
import withApollo from '~/src/lib/withApollo';
import { CURRENT_USER } from '~/src/queries';

const UserContext = createContext();

export const UserProvider = withApollo((props) => {
  const {
    loading: loadingCurrentUser,
    error: errorLoadingCurrentUser,
    data: currentUser
  } = useQuery(CURRENT_USER);

  if (loadingCurrentUser) {
    return <Loading fullScreen="true" description="Logging in..." />;
  } else if (errorLoadingCurrentUser) {
    console.error(errorLoadingCurrentUser);
    return `Error: ${errorLoadingCurrentUser}`;
  }

  const channels = currentUser.me.channels;
  // let index = () => {
  //   let mergedIndices;
  //   for (const item in currentUser.me.channels_index) {
  //     mergedIndices.push(...currentUser.me.channels_index[item].channels);
  //   }
  //   return mergedIndices;
  // };

  let index = currentUser.me.channels_index;

  return (
    <UserContext.Provider value={{ currentUser, channels, index }} {...props}>
      <SelectionProvider>{props.children}</SelectionProvider>
    </UserContext.Provider>
  );
});

export const useUser = () => useContext(UserContext);
