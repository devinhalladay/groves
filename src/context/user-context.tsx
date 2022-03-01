import { useQuery } from '@apollo/client';
import { SelectionProvider } from '@context/selection-context';
import { WithApolloProps } from 'next-with-apollo';
import { createContext, useContext } from 'react';
import Loading from '~/src/components/Loader';
import { CURRENT_USER } from '~/src/graphql/queries';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '../types';

const UserContext = createContext(null);

export interface IUserContext {
  me: Ervell.ProfileChannelIndex;
}

export type UserContext = {
  currentUser: IUserContext;
  index: Ervell.ProfileChannelIndex_User_channels_index[] | null;
  flatIndex: Ervell.ProfileChannelIndex_User_channels_index_channels;
};

export const UserProvider = withApollo((props) => {
  const {
    loading,
    error,
    data: currentUser,
  } = useQuery<IUserContext>(CURRENT_USER);

  if (loading) return <Loading fullScreen={true} />;

  if (error) throw new Error(error.message);

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
