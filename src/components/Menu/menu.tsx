import React, {FC, createContext, useState,CSSProperties} from 'react'

import classNames from 'classnames'
import { MenuItemProps } from './menuitem';


type MenuMode='horizontal' | 'vertical'
type SelectCallback =(selectedIndex:string)=>void;

export interface MenuProps{
    /**默认选中索引 */ 
    defaultIndex?:string;
    /** 类名 */ 
    className?:string;
     /** 模式 */ 
    mode?:MenuMode;
       /** 样式 */ 
    style?:CSSProperties;
    /** 回调函数 */
    onSelect?:SelectCallback;
}


export const Menu:FC<MenuProps>=(props)=>{
    const {className,mode,style,children,defaultIndex,onSelect}=props 
    const [currentActive,setActive]=useState(defaultIndex)
    const classes =classNames('bigbear-menu',className,{
        'menu-vertical':mode==='vertical',
        'menu-horizontal':mode==='horizontal'
    })
    const handleClick=(index:string)=>{
        setActive(index)
        if(onSelect)onSelect(index)
    }
    const passedContext:IMenuContext={
        index:currentActive?currentActive:'0',
        onSelect:handleClick,
        mode:mode
    }
  
    return(
        <ul className={classes} style={style} data-testid="test-menu" >
            <MenuContext.Provider value={passedContext}>
            {
                React.Children.map(children,(child,index)=>{
                const childElement  = child as React.FunctionComponentElement<MenuItemProps>
                const {displayName}=childElement.type
                if(displayName==='MenuItem' || displayName==='SubMenu'){
                    return React.cloneElement(childElement,{index:index+''})
                }else{
                    console.error('menu children must be menuitem child or submenu child')
                }})
            }
            </MenuContext.Provider>
        </ul>
    )
}





interface IMenuContext{
    index:string;
    onSelect?:SelectCallback;
    mode?:MenuMode
}

export const MenuContext = createContext<IMenuContext>({index:'0'})

// typescript react dockgen bug
//const ForwardMenu = React.forwardRef<HTMLUListElement,MenuProps>(Menu as RefForwardingComponent<HTMLUListElement,MenuProps>)

Menu.defaultProps={
    defaultIndex:'0',
    mode:'horizontal'
}

export default Menu;

