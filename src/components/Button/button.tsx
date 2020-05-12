import React ,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes}from 'react'
import classNames from 'classnames'



export type ButtonSize = 'lg' | 'sm' |'default'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'| 'neu-w-up'|'neu-w-down'|'neu-w-co'|'neu-w-fl'



interface BaseButtonProps {
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
        ...restProps
    } = props

    const classes = classNames('btn', className, {
        [`btn-type-${btnType}`]: btnType,
        [`btn-size-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType ==='link' ) {
        return (
            <a className={classes} href={href} {...restProps}>
                {children}
            </a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled}  {...restProps}>
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

