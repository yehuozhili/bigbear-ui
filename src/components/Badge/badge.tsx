import React, { FC, ReactNode, useRef, useEffect } from "react";
import classNames from "classnames";

export interface BadgeProps {
	/** 颜色*/
	type?:
		| "primary"
		| "default"
		| "danger"
		| "secondary"
		| "success"
		| "info"
		| "light"
		| "warning"
		| "dark";
	/**最外层元素的额外类名*/
	className?: string;
	/**ref回调*/
	refCallback?: (e: HTMLDivElement | null) => void;
	/** 数字，文本，图标都可以传*/
	count?: ReactNode;
	/** 控制是否显示*/
	visible?: boolean;
	/** 是否只显示小点 */
	dot?: boolean;
}

export const Badge: FC<BadgeProps> = (props) => {
	const { refCallback, className, type, count, visible, dot } = props;
	const classes = classNames("bigbear-badge", `bigbear-type-${type}`, className);
	const divref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (refCallback && divref.current) {
			refCallback(divref.current);
		}
	}, [refCallback]);
	return (
		<div className={classes} ref={divref}>
			{count || dot ? (
				<div
					className={`bigbear-badge-count bigbear-count-${type}
            ${props.children ? "" : "nochildren"} ${visible ? "" : "badge-hide"} ${
						dot ? "badge-dot" : ""
					}`}
				>
					<span>{count}</span>
				</div>
			) : null}
			{props.children ? props.children : null}
		</div>
	);
};
Badge.defaultProps = {
	type: "danger",
	visible: true,
	dot: false,
	count: ""
};

export default Badge;
