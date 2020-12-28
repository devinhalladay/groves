import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useEffect, useContext } from 'react';
import UserContext from '../context/user-context';

export const login = ({ ctx, access_token }) => {
  setCookie(ctx, 'access_token', access_token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  });

  Router.push('/g');
};

export const auth = (ctx) => {
  const access_token = parseCookies()['access_token'];

  // If there's no token, it means the user is not logged in.
  if (!access_token) {
    if (typeof window === 'undefined') {
      // Redirect if on the server
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    } else {
      // Redirect if on the client
      Router.push('/');
      Router.reload();
    }
  }

  return access_token;
};

export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const access_token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, access_token };
  };

  return Wrapper;
};
