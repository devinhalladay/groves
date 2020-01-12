import React, { Component, useState, useEffect } from 'react';
import { withRouter , BrowserRouter as Router, Link, useLocation, useHistory } from "react-router-dom";
import { parseUrl } from 'query-string'
import axios from 'axios'
import { withCookies, useCookies } from 'react-cookie';

import UserContext from '../components/UserContext'

import { register } from '../serviceWorker';

// export class ArenaClient {
//   constructor(accessToken) {
//     this.accessToken = accessToken;
//   }

//   _makeRequest(method, path, contents) {
//     return axios[method](`/api/make-request`, {
//       body: {
//         path: path,
//         content: {}
//       }
//     })
//   }

//   // setMe(me) {
//   //   this.me = me;
//   //   return Promise.resolve(this.me);
//   // }

//   // getMe() {
//   //   return this._makeRequest('get', `/v2/me`).then(resp => {
//   //     return resp.data;
//   //   });
//   // }

//   // getChannelsForMe() {
//   //   return this._makeRequest('get', `/v2/users/${this.me.id}/channels`);
//   // }
// }

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

function Callback(props) {
  const [cookies, setCookie] = useCookies(['arena_token']);


  let history = useHistory();
  const parsedUrl = parseUrl(window.location.search)
  const code = parsedUrl.query.code

  useEffect(() => {
    async function loginInUser() {
      // await props.handleLogin('post').then(console.log)
      await axios.post(`${process.env.REACT_APP_APPLICATION_API_BASE}/auth-user`, { code: code } ).then(console.log)
    }

    loginInUser()


    // props.handleLogin()
    
    
  //   async function authUser() {
  //     props.

  //     // console.log(user);


    
  //     // hit serverless auth function
  // }
  }, [])

  return null
}


export default withCookies(withRouter(Callback))