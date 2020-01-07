import React, { Component, Fragment, useEffect } from 'react';
import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { parseUrl } from 'query-string'
import axios from 'axios'

import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'


import { withCookies, useCookies } from 'react-cookie';


import User from './User'

const Orchard = (props) => {
  
  const [cookies] = useCookies(['arena_auth_token']);

  useEffect(() => {
    console.log('running');
    
    axios.get(
      'https://api.are.na/v2/users/11309/channels',
      { 
        "headers": {
          "authorization": "Bearer " + cookies.arena_auth_token
        }
      }
    ).then(res => {
      console.log('test');
      
      console.log(res);
    })
    return () => {
      return <User user={props.user} />
    };
  }, [])
}

export default Orchard