import React ,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes, useEffect, useRef}from 'react'
import classNames from 'classnames'



export type ButtonSize = 'lg' | 'sm' |'default'
export type ButtonType = 'primary' | 'default' | 'danger'|
'secondary'|'success'|'info'|'light'|'warning'|'dark' | 'link'| 'neu-w-up'|'neu-w-down'|'neu-w-co'|'neu-w-fl'



export interface BaseButtonProps {
    className?: string
    disabled?: boolean
    /** 设置按钮大小 */
    size?: ButtonSize
    /**
    * 设置按钮类型
    */
    btnType?: ButtonType
     /** link类型才有效的url */
    href?: string,
      /** 回调ref，组件加载完成回调ref，返回值会在卸载组件时调用 */
    refcallback?:(ref:any)=>any;
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props:ButtonProps) => {
    const {
        btnType,
        size,
        disabled,
        children,
        href,
        className,
        refcallback,
        ...restProps
    } = props

    const classes = classNames('btn', className, {
        [`btn-type-${btnType}`]: btnType,
        [`btn-size-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    const btnRef = useRef(null)
    useEffect(()=>{ 
        let uninstall:any=null
        if(refcallback){
            uninstall= refcallback(btnRef)
        }
        return ()=>{
            if(typeof uninstall ==='function'){
                uninstall()
            }
        }
    },[ refcallback])

    if (btnType ==='link' ) {
        return (
            <a className={classes} href={href} {...restProps} ref ={btnRef} >
                {children}
            </a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled}  {...restProps} ref={btnRef}>
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default',
    size:'default',
    href:'/'
}

export default Button

