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
}

export const Alert:FC<AlertProps> = function(props:AlertProps){
    const {title,type,description,directions,autoclosedelay,className,initAnimate,wrapper}=props
    const classes = classNames('bigbear-alert',`bigbear-alert-${type}`,className?className:'')
    const [state,setState]=useState(!initAnimate)
    useEffect(()=>{
        if(initAnimate){
            setState(true)
        }
        if(autoclosedelay){
            setTimeout(() => {
                setState(false)
            }, autoclosedelay);
        }
    },[autoclosedelay,initAnimate])
    return(
        <Transition in={state} animation={`zoom-in-${directions}` as AnimationName}
         timeout={300} wrapper={wrapper} > 
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
    wrapper:false
}

export default Alert;