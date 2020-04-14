import React, { Component, useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import Router from 'next/router'

import UserContext from '../../context/UserContext'


import { parseCookies, setCookie, destroyCookie } from 'nookies'

// import axios from 'axios'
import fetch from 'isomorphic-unfetch'
import ArenaContext from '../../context/ArenaContext';

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

const Callback = ({ ctx, access_token, ...props }) => {
  const { arena } = useContext(ArenaContext)
  const { user, setUser, channels, setChannels } = useContext(UserContext)

  useEffect(() => {
    arena.getChannelsForMe()
      .then(chans => {
        setChannels([ ...channels, ...chans ])
      })
  }, [access_token])

  return <h1>Authenticating...</h1>
}

export async function getServerSideProps({ ctx, query: { code }, ...props }) {
  const res = await fetch(`${process.env.APPLICATION_API_CALLBACK}/${process.env.APPLICATION_API_PATH}/auth-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ auth_code: code })
  });

  const { access_token } = await res.json()
 
  // Pass data to the page via props
  return { props: { access_token: access_token } }
}


export default Callback