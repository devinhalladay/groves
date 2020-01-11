import React, { Component, useState, useEffect } from 'react';
import { withRouter , BrowserRouter as Router, Link, useLocation, useHistory } from "react-router-dom";
import { parseUrl } from 'query-string'
import axios from 'axios'
import { withCookies, useCookies } from 'react-cookie';

import UserContext from '../components/UserContext'

import gql from 'graphql-tag'
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks';
import { register } from '../serviceWorker';

import { useAuth, useUser } from '../api/use-auth.js'

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

class ArenaClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  _makeRequest(method, path) {
    return axios[method](`https://cors-anywhere.herokuapp.com/https://api.are.na/${path}`, {
      headers: {
        "authorization": `Bearer ${this.accessToken}`
      }
    });
  }

  setMe(me) {
    this.me = me;
    return Promise.resolve(this.me);
  }

  getMe() {
    return this._makeRequest('get', `/v2/me`).then(resp => {
      return resp.data;
    });
  }

  getChannelsForMe() {
    return this._makeRequest('get', `/v2/users/${this.me.id}/channels`);
  }
}

function Callback(props) {
  // const [user, setUser] = useState({})
  let user = localStorage.getItem('user')
  const [createUser] = useMutation(CREATE_USER)

  const [getUser, { called, loading, data }] = useLazyQuery(
    GET_USER,
    { variables: { profileID: user ? user.profile_id : 0 } }
  );

  const [cookies, setCookie] = useCookies(['arena_token']);

  let history = useHistory();
  const parsedUrl = parseUrl(window.location.search)
  const code = parsedUrl.query.code

  useEffect(() => {
    async function authUser() {
      let token;
      
      axios.post(`https://cors-anywhere.herokuapp.com/https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}`
      ).then(res => {

        const arenaClient = new ArenaClient(res.data.access_token);
        setCookie('arena_token', token, { path: '/' })
        return arenaClient.getMe()
          .then(me => arenaClient.setMe(me))
          .then(me => {
            props.handleAuth('LOGIN', me)
            console.log('cool')
            arenaClient.getChannelsForMe().then(console.log)
            history.push('/orchard')
          })

        
      //   axios.get(
      //     'https://cors-anywhere.herokuapp.com/https://api.are.na/v2/me', 
      //     { 
      //       "headers": {
      //         "authorization": "Bearer " + token
      //     }}).then((res) => {
      //       // setUser(res.data)
      //       props.handleAuth('LOGIN', res.data)
      //       // getUser({profileID: res.data.profile_id})
      //       return res.data
      // }).then((user) => {
      //     props.handleAuth('LOGIN', user)

      //     axios.get(`https://cors-anywhere.herokuapp.com/https://api.are.na/v2/users/${user.profile_id}/channels`).then(console.log);
      //     history.push('/orchard')
      // })
    }).catch(err => {
      console.error(err);
    })
  }

  authUser()
  }, [])

  return null
}


export default withCookies(withRouter(Callback))