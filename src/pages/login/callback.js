import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth-context';
import Loading from '../../components/Loader';

const Callback = ({ ctx, query: { code }, ...props }) => {
  const { login, logout } = useAuth();

  useEffect(() => {
    login({ ctx, code });
  }, []);

  return (
    <>
      <Loading fullScreen="true" description="Authenticating..." />
    </>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: { query }
  };
}

export default Callback;
