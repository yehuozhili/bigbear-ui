import React, { useContext, FC, CSSProperties } from 'react'
import {MenuContext} from './menu'
import classNames from 'classnames'


export interface MenuItemProps{
    index?:string;
    disabled?:boolean;
    className?:string;
    style?:CSSProperties;
}





export const MenuItem : FC<MenuItemProps> =(props)=>{
    const {index ,disabled,className,style,children}= props;
    const context =useContext(MenuContext)
    const classes = classNames('bigbear-menuitem',className,{
        'isdisabled':disabled,
        'isactive':context.index===index
    })
    const handleClick=()=>{
        if(context.onSelect&&!disabled&&typeof index ==="string"){
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.displayName='MenuItem';

export default MenuItem;