import React, { PropsWithChildren, CSSProperties } from 'react';
import classnames from 'classnames'

interface DividerProps{
    direction:'center'|'left'|'right',
    className?:string;
    style?:CSSProperties;
}

function Divider(props:PropsWithChildren<DividerProps>){
    const {className,style}=props;
    const classes = classnames('bigbear-divider',className)
    return (
        <div className={classes} style={style}></div>
    )
}


export default Divider;