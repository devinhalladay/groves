import { useEffect } from "react";
import Router, { withRouter } from "next/router";
import nextCookie from "next-cookies";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const auth = ctx => {
  const { auth_token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!auth_token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    } else {
      Router.push("/");
    }
  }

  return auth_token;
};

export const logout = (ctx) => {
  destroyCookie(ctx, "auth_token");
  Router.push("/");
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    // const syncLogout = event => {
    //   if (event.key === "logout") {
    //     console.log("logged out from storage!");
    //     Router.push("/login");
    //   }
    // };

    // useEffect(() => {
    //   window.addEventListener("storage", syncLogout);

    //   return () => {
    //     window.removeEventListener("storage", syncLogout);
    //     window.localStorage.removeItem("logout");
    //   };
    // }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};