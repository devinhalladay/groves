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

    // fetch(`https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}`, {
    //   method: 'post',
    //   body: JSON.stringify(),
    //   headers: {
    //     'Access-Control-Allow-Headers': '*'
    //   }
    // }).then(function(response) {
    //   console.log(response);
      
    //   return response.json();
    // }).then(function(data) {
    //   // ChromeSamples.log('Created Gist:', data.html_url);
    // });

    await axios
    .post(
        `https://cors-anywhere.herokuapp.com/https://dev.are.na/oauth/token?client_id=${process.env.REACT_APP_APPLICATION_ID}&client_secret=${process.env.REACT_APP_APPLICATION_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_APPLICATION_CALLBACK}`,
        {},
        {
          headers: {
            'Access-Control-Allow-Headers': '*'
          }
        }
    )
    .then(async res => {
      console.log(res);
      localStorage.setItem('auth_token', res.data.access_token);

      fetch("https://api.are.na/v2/me", {
        "method": "GET",
        "headers": {
          "authorization": "Bearer " + localStorage.getItem('auth_token')
        }
      }).then(response => {
        // console.log(response.json());
        return response.json();
      }).then((json) => {
        localStorage.setItem('user', json)
      }).catch(err => {
        console.log(err);
      });
    })
  }

  render() {
    return null
  }
}


 // TODO: redirect to home
      // await axios
      //   .post(`https://api.are.na/v2/me`)
      //   .then(async res => {
      //     // TODO: uhhhh idk - figure this out
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

    //   let config = {
    //     headers: {
    //       "authorization": "Bearer " + localStorage.getItem('auth_token'),
    //     }
    //   };
    //   var bodyParameters = {
    //     // title: "this came from the arena api",
    //     // status: "open"
    //     // content: "this came from axios!"
    //   };
    //   axios
    //     .get(
    //       "https://api.are.na/v2/me",
    //       bodyParameters,
    //       config
    //     )
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // })
    // .catch(err => {
    //   console.log(err);
    // });