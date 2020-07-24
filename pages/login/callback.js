import React, { useEffect } from "react";
import { useAuth } from "../../context/auth-context";

const Callback = ({ ctx, query: { code }, ...props }) => {
  const { login, logout } = useAuth();

  useEffect(() => {
    login({ ctx, code });
  }, []);

  return (
    <>
      <h1>Authenticating...</h1>
    </>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  };
}

export default Callback;
