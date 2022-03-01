import { useQuery } from '@apollo/client';
import { SelectionProvider } from '@context/selection-context';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession, SessionProviderProps, useSession } from 'next-auth/react';
import React, { createContext, useContext } from 'react';
import Loading from '~/src/components/Loader';
import { CURRENT_USER } from '~/src/graphql/queries';
import withApollo from '~/src/hooks/withApollo';
import client from '../lib/apollo-client';
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

  console.log('currentUser', currentUser);

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

// export const getServerSideProps: GetServerSideProps<
//   SessionProviderProps
// > = async (ctx) => {
//   const session = await getSession(ctx.req);
//   console.log(session);

//   return { props: { session } } as { props: SessionProviderProps };
// };

export const useUser = () => useContext(UserContext);
