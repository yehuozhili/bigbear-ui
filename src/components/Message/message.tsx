import React, { FC, ReactNode } from 'react'
import Alert from '../Alert';
import { createPortal } from 'react-dom';
import { AlertProps } from '../Alert/alert';
import ReactDOM from 'react-dom'
import Icon from '../Icon';



export type DirectionType='top'|'lt'|'lb'|'rt'|'rb';

export interface MessageProps{
    /**文本内容 */
    title?:string;
    /**容器 */
    container?:Element|null;
     /**类型 */
    type?:"primary" | "default" | "danger" | "secondary" | "success" | "info" | "light" | "warning" | "dark"  ;
    /** 位于container的方向 */
    directions?:'top'|'lt'|'lb'|'rt'|'rb';
    /** 自动关闭延迟 */
    autoclosedelay?:number,
     /** 图标 */
    icon?:ReactNode
}


function directionSelect(directions:DirectionType){
    if(directions==='top'){
        return 'top'
    }else if(directions==='lt'||directions==='lb'){
        return 'left'
    }else if(directions==='rt'||directions==='rb'){
        return 'right'
    }else{
        return 'bottom'
    }
}


export const  Message:FC<MessageProps>=function(props:MessageProps){
    let {title,container,directions,autoclosedelay,icon,type}=props;
    if(!container){
        container=document.createElement('div')
        container.className='bigbear-message-factory'
        container=document.body.appendChild(container)
    }
    let select:AlertProps['directions'] = directionSelect(directions as DirectionType)
    return(
     createPortal(<Alert title={title} 
        className={`bigbear-message-${directions} bigbear-message`}
        autoclosedelay={autoclosedelay}
        icon={icon}
        type={type}
        initAnimate={true}
        directions={select}
        ></Alert>,container as Element)
    )
}

Message.defaultProps={
    title:'',
    container:document.querySelector('.bigbear-message-factory'),
    type:'default',
    directions:'top',
    autoclosedelay:3000
}

function messageRender(str:string,messageType:AlertProps['type'],icon?:ReactNode,directions?:DirectionType){
    let container =document.querySelector('.bigbear-message-factory')
    if(!container){
        container=document.createElement('div')
        container.className='bigbear-message-factory'
        container=document.body.appendChild(container)
    }
    let dom =document.querySelector('.bigbear-message-factory-item')
    if(dom){
        container.removeChild(dom)
    }
    dom = document.createElement('div')
    dom.className='bigbear-message-factory-item';
    dom=container.appendChild(dom)
    return ReactDOM.render(<Message title={str} type={messageType} icon={icon} directions={directions}></Message>,
        dom)
}


const message={
    default:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'default',icon?icon:undefined,directions),
    primary:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'primary',icon?icon:<Icon icon='bell' theme='default' ></Icon>,directions),
    danger:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'danger',icon?icon:<Icon icon='times-circle' theme='default' ></Icon>,directions),
    warning:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'warning',icon?icon:<Icon icon='exclamation-circle' theme='dark' ></Icon>,directions),
    info:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'info',icon?icon:<Icon icon='info-circle' theme='default' ></Icon>,directions),
    secondary:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'secondary',icon?icon:<Icon icon='bookmark' theme='default' ></Icon>,directions),
    success:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'success',icon?icon:<Icon icon='check-circle' theme='default' ></Icon>,directions),
    light:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'light',icon?icon:<Icon icon='map-marker-alt' theme='dark' ></Icon>,directions),
    dark:(str:string,icon?:ReactNode,directions:DirectionType='top')=>messageRender(str,'dark',icon?icon:<Icon icon='atom' theme='default' ></Icon>,directions),
}


export default Message;
export {message};