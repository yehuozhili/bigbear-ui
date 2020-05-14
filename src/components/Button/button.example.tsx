import React, {  useEffect } from 'react'
import Button from './button'
import { useState } from 'react'

function SwichButtonType(){
    const [state,setState] = useState(false)
    return (
       <Button btnType={state?'neu-w-down':'neu-w-up'} onClick={()=>setState(!state)}>SwichButtonType</Button>
    )
}
export  default SwichButtonType ;



export function FastSwitchBttonType(){
    const [state,setState] = useState(false)
    const downReplace=()=>(setState(true))
    const upReplace =()=>(setState(false))
    useEffect(()=>{
        let ref=document.querySelector('.fastswitch')
        if(ref){
            ref.addEventListener('mousedown',downReplace)
            ref.addEventListener('mouseup',upReplace)
        }
        return()=>{
            ref?.removeEventListener('mouseup',upReplace);
            ref?.removeEventListener('mousedown',downReplace)
        }
    },[])
    return (
        <Button btnType={state?'neu-w-down':'neu-w-fl'} 
         className={'fastswitch'}>FastSwitchBttonType</Button>
     )
}