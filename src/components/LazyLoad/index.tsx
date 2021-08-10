import React, { useState, useEffect, lazy, Suspense } from 'react';
interface isProps{
  component:any,
  delay: any,
  other:any

}
export default function({component, delay, other}:isProps){
  const [state, setState] = useState()

  useEffect(() => {

  }, [])
  const _renderLazy =() => {
    let Lazy;
    if(!component) {
      Lazy=import('./error')
    }
    Lazy = lazy(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(component)
        }, delay||300);
      })
    })
    return <Lazy {...other}></Lazy>;
  }
  return (
    <div>
       <Suspense fallback={<div>loading...</div>}>
         {_renderLazy()}
       </Suspense>
    </div>
  )
}
