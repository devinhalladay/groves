import React from 'react'

const ChannelList = (props) => {
  console.log(props);

  
  return (
    props.channels.map(channel => 
      <div key={channel.id}>{channel.title}</div>
    )
  )

}


export default ChannelList;
