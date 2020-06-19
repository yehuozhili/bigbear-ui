import React, { FC, createContext, useState, CSSProperties } from "react";

import classNames from "classnames";
import { MenuItemProps } from "./menuitem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
	/**默认激活索引  */

	defaultIndex?: string;
	/** 类名 */

	className?: string;
	/** 模式 */

	mode?: MenuMode;
	/** 样式 */

	style?: CSSProperties;
	/** 回调函数 */
	onSelect?: SelectCallback;
	/** 用户自己逻辑，可以拿到点击索引和修改激活索引的方法，用于制作二次点击取消等效果*/
	customHandle?: (
		index: string,
		current: string | undefined,
		setActive: React.Dispatch<React.SetStateAction<string | undefined>>
	) => void;
}

export const Menu: FC<MenuProps> = (props) => {
	const { className, mode, customHandle, style, children, defaultIndex, onSelect } = props;
	const [currentActive, setActive] = useState(defaultIndex);
	const classes = classNames("bigbear-menu", className, {
		"menu-vertical": mode === "vertical",
		"menu-horizontal": mode === "horizontal"
	});
	const handleClick = (index: string) => {
		if (customHandle) {
			customHandle(index, currentActive, setActive);
		} else {
			setActive(index);
		}
		if (onSelect) onSelect(index);
	};
	const passedContext: IMenuContext = {
		index: currentActive ? currentActive : "0",
		onSelect: handleClick,
		mode: mode
	};

	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={passedContext}>
				{React.Children.map(children, (child, index) => {
					const childElement = child as React.FunctionComponentElement<MenuItemProps>;
					if (childElement && childElement.type && childElement.type.displayName) {
						const displayName = childElement.type.displayName;
						if (displayName === "MenuItem" || displayName === "SubMenu") {
							return React.cloneElement(childElement, { index: index + "" });
						} else {
							console.error("menu children must be menuitem child or submenu child");
						}
					} else {
						console.error(
							'menu child have not props names "type" and "displayName"',
							childElement
						);
					}
				})}
			</MenuContext.Provider>
		</ul>
	);
};

interface IMenuContext {
	index: string;
	onSelect?: SelectCallback;
	mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

// typescript react dockgen bug
//const ForwardMenu = React.forwardRef<HTMLUListElement,MenuProps>(Menu as RefForwardingComponent<HTMLUListElement,MenuProps>)

Menu.defaultProps = {
	defaultIndex: "-1",
	mode: "horizontal"
};

export default Menu;
