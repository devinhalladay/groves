import React, { useState, useEffect, useContext, createContext } from "react";

import { useHistory } from "react-router-dom";

import { parseUrl } from 'query-string'
import axios from 'axios'
import { withCookies, useCookies } from 'react-cookie';

const authContext = createContext();
const userContext = createContext();

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
  
  // Return the user object and auth methods
  return {
    // user,
    // signin,
    // signup,
  };
}