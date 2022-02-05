import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth-context';
import Loading from '../../components/Loader';
import { useRouter } from 'next/router';

const Callback = ({ ctx, query: { code }, ...props }) => {
  const { login, accessToken } = useAuth();

  const router = useRouter();

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
    props: { query },
  };
}

export default Callback;
