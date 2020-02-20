import React, { Component, useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import Router from 'next/router'

import { parseCookies, setCookie, destroyCookie } from 'nookies'

// import axios from 'axios'
import fetch from 'isomorphic-unfetch'

// import { withCookies, useCookies } from 'react-cookie';


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

const Callback = ({ ctx, auth_token, ...props }) => {
  // const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);

  React.useEffect(() => {
    setCookie(ctx, 'arena_token', auth_token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    Router.replace("/callback", "/orchard", { shallow: true });
  }, [auth_token]);

  return <h1>${auth_token}</h1>
}

Callback.getInitialProps = async ({ ctx, query: { code }, ...props }) => {
  const res = await fetch(`${process.env.APPLICATION_API_CALLBACK}/${process.env.APPLICATION_API_PATH}/auth-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ access_code: code })
  });
 
  const data = await res.json();

  return { auth_token: data.auth_token }
  
    // setCookie('arena_token', res.data.auth_token, { path: '/' })
}


export default Callback