import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const Login = props => {
  return <div>Loading</div>;
};

Login.getInitialProps = async ctx => {
  let code = ctx.query.code;

  await axios
    .post(
      `https://dev.are.na/oauth/token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.LOCAL_CALLBACK}`
    )
    .then(async res => {
      setCookie(ctx, "auth_token", res.data.access_token);

      if (ctx.req) {
        // We are on the server
        ctx.res.writeHead(302, { Location: "/home" });
        ctx.res.end();
      } else {
        // We are on the client
        Router.push("/home");
      }
    })
    .catch(err => {
      console.log(err);
    });

  return token;
};

export default Login;