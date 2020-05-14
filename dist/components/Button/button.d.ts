import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
export declare type ButtonSize = 'lg' | 'sm' | 'default';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'neu-w-up' | 'neu-w-down' | 'neu-w-co' | 'neu-w-fl';
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    /** 设置按钮大小 */
    size?: ButtonSize;
    /**
    * 设置按钮类型
    */
    btnType?: ButtonType;
    /** link类型才有效的url */
    href?: string;
}
declare type NativeButtonProps = ButtonHTMLAttributes<HTMLElement> & BaseButtonProps;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export default Button;
