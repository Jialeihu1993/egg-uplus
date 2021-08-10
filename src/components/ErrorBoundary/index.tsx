import React, { useState, useEffect } from 'react';

// interface isProps {
// }
export default function ErrorBoundary(props:any){
  const [flag, setFlag] = useState(false);


  useEffect(() => {

  }, [])

  return (
    <div>
      {flag?<h1>发生错误</h1>: props.children}
    </div>
  )
}
