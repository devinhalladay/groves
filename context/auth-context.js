import React, { useContext, useState } from "react";
import { createContext } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import withApollo from "../lib/withApollo";

const AuthContext = createContext();

const AuthProvider = withApollo((props) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState(
    parseCookies()["access_token"] ? parseCookies()["access_token"] : null
  );

  const hasPreviousSession =
    accessToken !== null && window.localStorage.getItem("user");

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
        setAccessToken(res.access_token);

        setCookie(ctx, "access_token", res.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      })
      .then(() => {
        router.push("/app");
      });
  };

  const logout = (ctx) => {
    destroyCookie(ctx, "access_token", {
      path: "/",
    });

    // TODO: Make sure users logout from all tabs
    window.localStorage.setItem("logout", Date.now());

    window.localStorage.removeItem("user");

    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, hasPreviousSession }}
      {...props}
    />
  );
});

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, AuthContext };
