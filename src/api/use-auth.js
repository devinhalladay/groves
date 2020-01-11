import React, { useState, useEffect, useContext, createContext } from "react";

import { useHistory } from "react-router-dom";

import { parseUrl } from 'query-string'
import axios from 'axios'
import { withCookies, useCookies } from 'react-cookie';

import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks';

const authContext = createContext();
const userContext = createContext();

export const GET_USER = gql`
  query User($profileID: Int!) {
    userByProfileID(profile_id: $profileID) {
      data {
        slug
        username
        first_name
        last_name
        full_name
        avatar
        channel_count
        profile_id
        initials
        is_premium
        is_exceeding_private_connections_limit
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $profile_id: Int!, $slug: String!, $username: String!, $first_name: String!, $last_name: String!, $full_name: String!, $avatar: String!, $channel_count: Int!, $initials: String!, $is_premium: Boolean!, $is_exceeding_private_connections_limit: Boolean!) {
  createUser(data: {
    profile_id: $profile_id, slug: $slug, username: $username, first_name: $first_name, last_name: $last_name, full_name: $full_name, avatar: $avatar, channel_count: $channel_count, initials: $initials, is_premium: $is_premium, is_exceeding_private_connections_limit: $is_exceeding_private_connections_limit
  }) {
    slug
    username
    first_name
    last_name
    full_name
    avatar
    channel_count
    profile_id
    initials
    is_premium
    is_exceeding_private_connections_limit
  }
}
`

// Arena component that wraps your app and passes down ...
// ... the user's /me response as a prop.
export function ProvideUser({ children }) {
  const [user, setUser] = useState({});
  const [cookies, setCookie] = useCookies(['arena_token', 'profile_id']);

  const parsedUrl = parseUrl(window.location.search)
  const code = parsedUrl.query.code
  let token;
    
  axios.post(`https://cors-anywhere.herokuapp.com/https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}`)
    .then(async res => {
      token = res.data.access_token
      setCookie('arena_token', token, { path: '/' })
      axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.are.na/v2/me', 
        { 
          "headers": {
            "authorization": "Bearer " + token
          }
        }
      ).then((res) => {
        const userObject = { user: res.data };
        setCookie('profile_id', res.data.profile_id, { path: '/' })
        setUser(userObject)
      })
    }).catch(err => {
      console.error(err);
    })

    return <userContext.Provider value={user}>{children}</userContext.Provider>
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Hook for child components to get the user object ...
// ... and re-render when it changes.
export const useUser = () => {
  return useContext(userContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth(props) {
  const [cookies, setCookie] = useCookies(['arena_token', 'profile_id']);
  const { loading, registeredUser, error } = useQuery(GET_USER, {
    variables: { profileID: cookies.allCookies.profile_id }
  })

  console.log(registeredUser);

  console.log(cookies);
  
  

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
//   const signin = (user) => {
//     setUser({
//       authenticated: true,
//       user: user
//     })
//  // cookies.remove('arena_auth_token')
//         // this.props.history.push('/');
//     return user
//   };

  // const signup = (email, password) => {
  //   return firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(response => {
  //       setUser(response.user);
  //       return response.user;
  //     });
  // };

  // const signout = () => {
  //   return firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       setUser(false);
  //     });
  // };

  // const sendPasswordResetEmail = email => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // const confirmPasswordReset = (code, password) => {
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(code, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(false);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);
  
  // Return the user object and auth methods
  return {
    // user,
    // signin,
    // signup,
    // signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
}