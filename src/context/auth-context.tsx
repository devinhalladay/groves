import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const router = useRouter();

  let accessToken = parseCookies()['access_token'] || null;

  const hasPreviousSession = accessToken !== null;

  const login = async ({ ctx, code }) => {
    const res = await fetch(
      `${process.env.APPLICATION_API_CALLBACK}/${process.env.APPLICATION_API_PATH}/auth-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ auth_code: code }),
      },
    );

    res.json().then((res) => {
      setCookie(ctx, 'access_token', res.access_token || null, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    });

    return router.push('/');
  };

  const logout = (ctx) => {
    destroyCookie(ctx, 'access_token', {
      path: '/',
    });

    window.localStorage.setItem('logout', Date.now().toString());

    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, hasPreviousSession }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, AuthContext };
