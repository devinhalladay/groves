import React, { Component, Fragment, useEffect } from 'react';
import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { parseUrl } from 'query-string'
import axios from 'axios'

import ChannelList from './ChannelList'


import { withCookies, useCookies } from 'react-cookie';


import User from './User'

const Orchard = (props) => {
  return (
    <ChannelList user={props.user} />
  )
}

export default Orchard