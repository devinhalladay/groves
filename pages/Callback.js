import React, { Component, useState, useEffect, useContext } from 'react';
// import { withRouter , BrowserRouter as Router, Link, useLocation, useHistory } from "react-router-dom";
import Link from 'next/link'

// import { parseUrl } from 'query-string'
// import axios from 'axios'
// import { withCookies, useCookies } from 'react-cookie';
// import fetch from 'unfetch'
// import useSWR from 'swr'

// import UserContext from '../components/UserContext'

// import { register } from '../serviceWorker';

// get channels and store their IDs
// during onboardig you need to manualyl fetch all blocks of all channels. this will take some time. 
// you can mitigate it in these ways: let the user invoke it via a "connect content" button and then show a load state,
// or load the content progressively like spotofy does when it downloads your playlists. you'd click a button
// and initiate import; maybe get 5 channels to start with, which is enoguh for onboarding, and then
// show a progress bar of the amount of data imported so far.
// to do update differentials when a content pull from are,na is triggered (after I already have content
// integrated into groves), I can take the blocks & chan IDs I've stored and diff against the master block;
// then I just fetch the ones that are missing, push them to the state, and we're all updated.

// also move the authentication to the server either by server rendering (which may actually solve many of the above problems)
// or by adding a second routing layer (in addition to react-router) in index.js that handles the oauth callback

const Callback = () => {
  // const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);
  // const parsedUrl = parseUrl(window.location.search)
  // const code = parsedUrl.query.code

  // useEffect(() => {
  //   const loginUser = async () => {
  //     await axios.post(`http://localhost:3001/${process.env.REACT_APP_APPLICATION_API_PATH}/auth-user`, { code: code }, { headers: { "Access-Control-Allow-Origin": "*", } } ).then((res) => {
  //       setCookie('arena_token', res.data.auth_token, { path: '/' })
  //     })

  //     props.history.push("/orchard");
  //   }

  //   loginUser()
  // }, [])

  // return null
  return null
}


export default Callback