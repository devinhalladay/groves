import React, { Component } from 'react';
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { parseUrl } from 'query-string'
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount () {
    const parsedUrl = parseUrl(window.location.search)
    const code = parsedUrl.query.code

    await axios
    .post(
      `https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APP_ID}&client_secret=${process.env.REACT_APP_APP_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_LOCAL_CALLBACK}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          crossdomain: true
        }
      }
    )
    .then(async res => {
      console.log(res);
      localStorage.setItem('auth_token', res.auth_token);
      // TODO: redirect to home
      // await axios
      //   .post(`https://api.are.na/v2/me`)
      //   .then(async res => {
      //     // TODO: uhhhh idk - figure this out
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

      let config = {
        headers: {
          Authorization: "bearer " + res.auth_token,
          "Content-Type": "application/x-www-form-urlencoded",
          "X-AUTH-TOKEN": res.auth_token,
          crossdomain: true
        }
      };
      var bodyParameters = {
        // title: "this came from the arena api",
        // status: "open"
        // content: "this came from axios!"
      };
      axios
        .get(
          "https://api.are.na/v2/me",
          bodyParameters,
          config
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(err => {
      console.log(err);
    });
  }

  

  render() {
    return null
  }
}