import React, { FC, useState, useEffect, ReactNode } from 'react'
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Transition from '../Transition';
import { AnimationName } from '../Transition/transition';


export interface AlertProps{
    /**  标题 */
    title?:string;
    /** 类型*/
    type?:'primary' | 'default' | 'danger'|'secondary'|'success'|'info'|'light'|'warning'|'dark'
    /**是否有关闭按钮*/
    close?:boolean;
    /** 内容*/
    description?:string|null;
    /** 动画方向 */
    directions?:'left'|'top'|'right'|'bottom';
     /** 自动关闭延时时间，0表示不自动关闭 */
    autoclosedelay?:number,
    /** 额外类名 */
    className?:string,
    /** 图标 */
    icon?:ReactNode;
    /**启用开场动画 */
    initAnimate?:boolean,
    /**是否套一层div  */
    wrapper?:boolean;
    /** 自动关闭后的回调函数  */
    closeCallback?:()=>void;
    /** 使用自定义动画的类名 */
    animateClassName?:string;
    /** 动画持续时间*/
    timeout?:number;
}

export const Alert:FC<AlertProps> = function(props:AlertProps){
    const {title,type,timeout,description,animateClassName,directions,autoclosedelay,className,initAnimate,wrapper,closeCallback}=props
    const classes = classNames('bigbear-alert',`bigbear-alert-${type}`,className?className:'')
    const [state,setState]=useState(!initAnimate)
    useEffect(()=>{
        if(initAnimate){
            setState(true)
        }
        let handler:number;
        if(autoclosedelay){
            handler=window.setTimeout(() => {
                setState(false)
                if(closeCallback)closeCallback()
            }, autoclosedelay);
        }
        return ()=>clearTimeout(handler)
    },[autoclosedelay, closeCallback, initAnimate])
    return(
        <Transition in={state} animation={`zoom-in-${directions}` as AnimationName}
        classNames={animateClassName?animateClassName:''}
         timeout={timeout!} wrapper={wrapper} > 
        <div className={classes} >
           
           <span>
           {
                props.icon&&props.icon
            }
               {title}</span>
            {
                description&&<span>{description}</span>
            }
        {
            props.close&&<Button btnType={type} onClick={()=>setState(false)}><Icon icon='times'></Icon></Button>
            
        }
        </div>
        </Transition>
    )
}

Alert.defaultProps={
    title:'',
    type:'default',
    close:false,
    description:null,
    directions:'top',
    autoclosedelay:0,
    initAnimate:false,
    wrapper:false,
    timeout:300
}

export default Alert;