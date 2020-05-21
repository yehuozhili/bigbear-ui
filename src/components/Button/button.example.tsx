import React, {   PropsWithChildren,  CSSProperties } from 'react'
import Button from './button'
import { useState } from 'react'

function NeuWdown(props:PropsWithChildren<{callback:()=>void,style?:CSSProperties}>){
    const [state,setState] = useState(false)
    return (
       <Button btnType={state?'neu-w-down':'neu-w-up'} onClick={()=>{
           setState(!state)
           props.callback()
        }} style={props.style}>{props.children}</Button>
    )
}
export  default NeuWdown;



export function NeuWclick(props:PropsWithChildren<{callback:()=>void,style?:CSSProperties}>){
    const [state,setState] = useState(false)
    const downReplace=()=>(setState(true))
    const upReplace =()=>(setState(false))
    const btnRef = (ref:any)=>{
        if(ref){
            ref.current.addEventListener('mousedown',downReplace)
            ref.current.addEventListener('mouseup',upReplace)
            ref.current.addEventListener('mouseleave',upReplace)
        }
        return()=>{
            ref.current?.removeEventListener('mouseup',upReplace);
            ref.current?.removeEventListener('mousedown',downReplace)
            ref.current?.removeEventListener('mouseleave',downReplace)
        }
    }
    return (
        <Button btnType={state?'neu-w-down':'neu-w-fl'} 
            style={props.style}
            onClick={props.callback}
            refcallback={btnRef}>{props.children}</Button>
     )
}

export function Ringclick(props:PropsWithChildren<{callback:()=>void,style?:CSSProperties}>){
    return (
    <div className="btn-type-neu-w-down" style={{padding:'10px',display:'inline-block',borderRadius:'5px',...props.style}}>
        <NeuWclick callback={props.callback}>{props.children}</NeuWclick>
    </div>
    )
}
