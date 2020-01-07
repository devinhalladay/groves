import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const User = (props) => {
  return (
    <div>
        Welcome, {props.user.username}!
        You have {props.user.channel_count} channels.
      </div>
  )
}

export default User