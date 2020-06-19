import React, { useContext, FC, CSSProperties } from "react";
import { MenuContext } from "./menu";
import classNames from "classnames";

export interface MenuItemProps {
	index?: string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
	/** 点了menuitem是否关闭submenu 只对horizontal模式有效*/
	close?: boolean;
	/** 延迟多久关闭，只在close为true生效*/
	delay?: number;
	setMenu?: React.Dispatch<React.SetStateAction<boolean>>;
	/** 点击后执行逻辑，通过menu回调也可以拿*/
	callback?: (index: string) => void;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
	const { index, disabled, className, style, children, close, setMenu, delay, callback } = props;
	const context = useContext(MenuContext);
	const classes = classNames("bigbear-menuitem", className, {
		isdisabled: disabled,
		isactive: context.index === index
	});
	const handleClick = () => {
		if (context.onSelect && !disabled && typeof index === "string") {
			context.onSelect(index);
		}
		if (close && setMenu && context.mode === "horizontal") {
			setTimeout(() => {
				setMenu(false);
			}, delay);
		}
		if (callback && !disabled && typeof index === "string") {
			callback(index);
		}
	};
	return (
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	);
};

MenuItem.displayName = "MenuItem";

MenuItem.defaultProps = {
	close: true,
	delay: 300
};

export default MenuItem;
