import React, { Component, Fragment, useEffect, useCallback } from 'react';
import ArenaClient from './arena-client';

// import { withRouter , BrowserRouter as Router, Link, useLocation } from "react-router-dom";
// import { parseUrl } from 'query-string'
// import axios from 'axios'

// import ChannelList from './ChannelList'

const Orchard = (props) => {
  const handleCreateChannel = useCallback(() => {
    // console.log('done');
    // getChannelsForMe
  })

  return (
    // <ChannelList channels={props.channels} />
    <>
      <div>Horray!</div>
      <button onClick={handleCreateChannel}>Create new channel</button>
    </>
  )
}

export default Orchard