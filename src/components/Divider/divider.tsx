import React, { PropsWithChildren, CSSProperties } from "react";
import classnames from "classnames";

interface DividerProps {
	/** 是否凸起 */
	elevate?: boolean;
	/** 文字方位 */
	direction: "center" | "left" | "right";
	/** 额外类名 */
	className?: string;
	/** 容器样式*/
	style?: CSSProperties;
}

function Divider(props: PropsWithChildren<DividerProps>) {
	const { className, style, direction, children, elevate } = props;
	const classes = classnames("bigbear-divider", className, {
		[`bigbear-divider-${direction}`]: children,
		"bigbear-divider-elevate": elevate
	});
	const innerspan = classnames("bigbear-divider-span", className, {
		"bigbear-divider-elevate": elevate
	});
	return (
		<div className={classes} style={style}>
			{children && <span className={innerspan}>{children}</span>}
			{!children && (
				<div
					className={`bigbear-divider-inner 
                    ${elevate ? "bigbear-divider-el" : ""} 
                    ${className ? className : ""}`}
				></div>
			)}
		</div>
	);
}

Divider.defaultProps = {
	elevate: true,
	direction: "center"
};
export default Divider;
