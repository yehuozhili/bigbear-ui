import React, { useContext } from 'react'
import {MenuContext} from './menu'
import classNames from 'classnames'


export interface MenuItemProps{
    index:number;
    disabled?:boolean;
    className?:string;
    style?:React.CSSProperties
}





const MenuItem : React.FC<MenuItemProps> =(props)=>{
    const {index ,disabled,className,style,children}= props;
    const context =useContext(MenuContext)
    const classes = classNames('bigbear-menuitem',className,{
        'isdisabled':disabled,
        'isactive':context.index===index
    })
    const handleClick=()=>{
        if(context.onSelect&&!disabled){
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
export default MenuItem