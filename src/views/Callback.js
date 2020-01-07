import React, { Component, useState, useEffect } from 'react';
import { withRouter , BrowserRouter as Router, Link, useLocation, useHistory } from "react-router-dom";
import { parseUrl } from 'query-string'
import axios from 'axios'
import { withCookies, useCookies } from 'react-cookie';

import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks';

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

function Callback(props) {
  const [createUser] = useMutation(CREATE_USER);
  const [getUser] = useQuery(GET_USER)

  const [cookies, setCookie] = useCookies(['arena_token']);

  let history = useHistory();
  const parsedUrl = parseUrl(window.location.search)
  const code = parsedUrl.query.code
  
  useEffect(() => {
    async function registerUser() {
      let token;
      
      axios.post(`https://cors-anywhere.herokuapp.com/https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}`
      ).then(async res => {
        token = res.data.access_token
        setCookie('arena_token', token, { path: '/' })

        getUser()
        
        axios.get(
          'https://cors-anywhere.herokuapp.com/https://api.are.na/v2/me', 
          { 
            "headers": {
              "authorization": "Bearer " + token
          }}).then((res) => {
            props.handleUpdateLoginState(res.data)
            createUser({variables: { ...res.data }})
        history.push("/orchard");
      })
    }).catch(err => {
      console.error(err);
    })
  }

  
  registerUser()
}, [])

return null

}


export default withCookies(withRouter(Callback))