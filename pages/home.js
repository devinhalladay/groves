import React from "react";
import Head from '../components/head'
import Header from '../components/header'
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import Arena from 'are.na'
import axios from 'axios'

const Home = props => {
  // const { name, login, bio, avatarUrl } = props.data

  return (
    <div><Head title="Home" />
    <Header />
    <h1>you're logged in!</h1></div>
  )
};

Home.getInitialProps = async ctx => {
  const { auth_token } = nextCookie(ctx)
  console.log(auth_token);
  
  let arena = new Arena({ accessToken: auth_token });

  console.log(arena.channel("this came from the arena api").create("open"));

  var config = {
    headers: { 
      'Authorization': "bearer " + auth_token,
      "Content-Type": "application/x-www-form-urlencoded",
      'X-AUTH-TOKEN': auth_token
    }
  };

  var bodyParameters = {
    // title: "this came from the arena api",
    // status: "open"
    content: "this came from axios!"
  }

  axios.post(
    'https://api.are.na/v2/channels/test-channel-xlhrdtqahda/blocks',
    bodyParameters,
    config
  ).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  });

  


  // return {auth_token}
}

export default withAuthSync(Home);