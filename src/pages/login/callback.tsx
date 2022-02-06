import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import Loading from '../../components/Loader';
import { useAuth } from '../../context/auth-context';

const Callback = ({ ctx, query: { code }, ...props }) => {
  const { login } = useAuth();

  useEffect(() => {
    login({ ctx, code });
  }, []);

  return (
    <>
      <Loading fullScreen={true} description="Authenticating..." />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: { query },
  };
};

export default Callback;
