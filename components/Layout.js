import React, { Fragment } from "react";

const Layout = (props) => {
  return (
    <div className="workspace">{props.children}</div>
  );
};

export const Container = (props) => {
  return props.children;
};

export default Layout;
