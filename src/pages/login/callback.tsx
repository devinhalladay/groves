import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Loading from '../../components/Loader';
import { useAuth } from '../../context/auth-context';

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
