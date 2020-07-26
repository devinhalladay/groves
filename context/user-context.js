import React, { useContext, createContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withApollo from "../lib/withApollo";
import { SelectionProvider } from "./selection-context";
import { CURRENT_USER } from '../queries'
import Loading from "../components/Loading";

const UserContext = createContext();

export const UserProvider = withApollo((props) => {
  const {
    loading: loadingCurrentUser,
    error: errorLoadingCurrentUser,
    data: currentUser,
  } = useQuery(CURRENT_USER);

  if (loadingCurrentUser) {
    return <Loading fullScreen="true" description="Logging in..." />
  } else if (errorLoadingCurrentUser) {
    console.error(errorLoadingCurrentUser);
    return `Error: ${errorLoadingCurrentUser}`;
  }

  const channels = currentUser.me.channels;
  const index = currentUser.me.channels_index

  return (
    <UserContext.Provider value={{ currentUser, channels, index }} {...props}>
      <SelectionProvider>{props.children}</SelectionProvider>
    </UserContext.Provider>
  );
});

export const useUser = () => useContext(UserContext);
