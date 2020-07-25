import React, { useContext, useState } from "react";
import { createContext } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import withApollo from "../lib/withApollo";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const router = useRouter();

  let accessToken = parseCookies()["access_token"] || null

  const hasPreviousSession = accessToken !== null

  const login = async ({ ctx, code }) => {
    const res = await fetch(
      `${process.env.APPLICATION_API_CALLBACK}/${process.env.APPLICATION_API_PATH}/auth-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ auth_code: code }),
      }
    );

    res
      .json()
      .then((res) => {
        setCookie(ctx, "access_token", res.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        router.push("/app");
      })
  };

  const logout = (ctx) => {
    destroyCookie(ctx, "access_token", {
      path: "/",
    });

    // TODO: Make sure users logout from all tabs
    window.localStorage.setItem("logout", Date.now());

    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, hasPreviousSession }}
      {...props}
    />
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, AuthContext };
