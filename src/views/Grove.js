import React, { useEffect, useState } from 'react';
import users from '../api/user.js'

function Grove() {

  const [data, setData] = useState('')

  useEffect(() => {
    users.then(data =>  setData(data))    
  }, [])
  return (
    <div className="Grove">
      <pre>
        {JSON.stringify(data, null, 1 )}
      </pre>
    </div>
  );
}

export default Grove;
