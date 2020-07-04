import React, { FC, DOMAttributes } from "react";
import classNames from "classnames";

export interface AvatarProps extends DOMAttributes<HTMLDivElement> {
	/** 大小*/
	size?: "lg" | "sm" | "default";
	/** 圆形 */
	round?: boolean;
	/** 颜色 */
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
}

export const Avatar: FC<AvatarProps> = (props) => {
	const { size, round, type, children, ...restProps } = props;
	const cnames = classNames("bigbear-avatar", `bigbear-avatar-type-${type}`);
	const wrappernames = classNames(`bigbear-avatar-wrapper-${type} bigbear-avatar-size-${size}`, {
		isround: round
	});
	return (
		<span className={wrappernames} {...restProps}>
			<span className={cnames}>{children ? children : null}</span>
		</span>
	);
};
Avatar.defaultProps = {
	size: "default",
	round: false,
	type: "default"
};

export default Avatar;
