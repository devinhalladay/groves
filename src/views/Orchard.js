import React, { Component, Fragment, useEffect } from 'react';
import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { parseUrl } from 'query-string'
import axios from 'axios'

import ChannelList from './ChannelList'

const Orchard = (props) => {
  return (
    // <ChannelList channels={props.channels} />
    <div>Horray!</div>
  )
}

export default Orchard