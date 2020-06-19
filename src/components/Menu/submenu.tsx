import React, {
	useContext,
	FC,
	FunctionComponentElement,
	CSSProperties,
	useState,
	useEffect,
	ReactNode,
	useRef
} from "react";
import { MenuContext } from "./menu";
import classNames from "classnames";
import { MenuItemProps } from "./menuitem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import { useClickOutside } from "../..";

export interface SubMenuProps {
	/** 是否默认开启*/
	isopen?: boolean;
	/** 传给item的索引*/
	index?: string;
	/** submenu的标题*/
	title?: ReactNode;
	/** 新增的类名*/
	className?: string;
	/** 样式*/
	style?: CSSProperties;
	/** 开启横向menu的hover打卡submenu */
	hover?: boolean;
}

const renderChildren = (
	children: React.ReactNode,
	menuopen: boolean,
	index: string | undefined,
	mode: "horizontal" | "vertical" | undefined,
	setMenuopen: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const classes = classNames("bigbear-submenu-children", {
		"bigbear-menuopen": menuopen
	});
	const childrenComponent = React.Children.map(children, (child, i) => {
		const childElement = child as FunctionComponentElement<MenuItemProps>;
		if (childElement.type.displayName === "MenuItem") {
			return React.cloneElement(childElement, {
				index: `${index}-${i}`,
				setMenu: setMenuopen
			});
		} else {
			console.error("submenu must in menuItem");
		}
	});
	return (
		<Transition
			in={menuopen}
			timeout={300}
			classNames={mode === "horizontal" ? "menu-zoom-in-top" : "menu-zoom-in-top-vertical"}
		>
			<ul className={classes}>{childrenComponent}</ul>
		</Transition>
	);
};
export const SubMenu: FC<SubMenuProps> = (props) => {
	const { index, className, style, children, title, isopen, hover } = props;
	const context = useContext(MenuContext);
	const [menuopen, setMenuopen] = useState(
		context.index === index && context.mode === "vertical" ? true : false
	);
	const classes = classNames("bigbear-menuitem bigbear-submenu menu-realative", className, {
		"bigbear-menuopen": menuopen,
		"bigbear-menuclose": !menuopen && context.mode === "horizontal",
		isvertical: context.mode === "vertical",
		issubactive: context.index.split("-")[0] === index
	});

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
	};
	let timer: number;
	const ref = useRef(null);
	useClickOutside(ref, () => {
		if (context.mode === "horizontal") {
			setMenuopen(false);
		}
	});
	const handleHover = (e: React.MouseEvent, toggle: boolean) => {
		clearTimeout(timer);
		e.preventDefault();
		timer = window.setTimeout(() => {
			setMenuopen(toggle);
		}, 300);
	};
	const hoverEvents =
		context.mode !== "vertical" && hover
			? {
					onMouseEnter: (e: React.MouseEvent) => {
						handleHover(e, true);
					},
					onMouseLeave: (e: React.MouseEvent) => {
						handleHover(e, false);
					}
			  }
			: {};
	useEffect(() => {
		if (isopen) {
			setMenuopen(true);
		}
	}, [isopen]);
	return (
		<li
			key={index}
			className={classes}
			style={style}
			onClick={handleClick}
			{...hoverEvents}
			ref={ref}
		>
			<div onClick={() => setMenuopen(!menuopen)} className="bigbear-submenu-title">
				{title ? title : null}
				<Icon icon="angle-down" className="bigbear-submenu-icon"></Icon>
			</div>
			{renderChildren(children, menuopen, index, context.mode, setMenuopen)}
		</li>
	);
};

SubMenu.displayName = "SubMenu";

SubMenu.defaultProps = {
	isopen: false,
	hover: false
};

export default SubMenu;
