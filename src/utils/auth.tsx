import Router from 'next/router';
import { useEffect } from 'react';

export const withAuthSync = (Component) => {
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

    return <Component {...props} />;
  };

  return Wrapper;
};
