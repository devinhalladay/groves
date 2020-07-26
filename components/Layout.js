import React, { Fragment } from "react";

const Layout = (props) => {
  return (
    <Fragment>
      <div className="workspace">{props.children}</div>
    </Fragment>
  );
};

export const Container = (props) => {
  return props.children;
};

export default Layout;
