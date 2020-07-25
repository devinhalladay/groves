import React, { useContext, createContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withApollo from "../lib/withApollo";
import { SelectionProvider } from "./selection-context";

const UserContext = createContext();

const CURRENT_USER = gql`
  {
    me {
      channels_index {
        channels {
          id
          title
          counts {
            contents
          }
        }
      }
      id
      slug
      name
      avatar
      counts {
        channels
      }
      channels(per: 20) {
        title
        slug
        id
        counts {
          contents
        }
      }
    }
  }
`;

export const UserProvider = withApollo((props) => {
  const {
    loading: loadingCurrentUser,
    error: errorLoadingCurrentUser,
    data: currentUser,
  } = useQuery(CURRENT_USER);

  if (loadingCurrentUser) {
    return "Loading...";
  } else if (errorLoadingCurrentUser) {
    console.error(errorLoadingCurrentUser);
    return `Error: ${errorLoadingCurrentUser}`;
  }

  // window.localStorage.setItem("user", JSON.stringify(currentUser));
  const channels = currentUser.me.channels;
  const index = currentUser.me.channels_index

  return (
    <UserContext.Provider value={{ currentUser, channels, index }} {...props}>
      <SelectionProvider>{props.children}</SelectionProvider>
    </UserContext.Provider>
  );
});

export const useUser = () => useContext(UserContext);
