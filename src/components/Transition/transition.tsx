import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";
import { TransitionProps } from "react-transition-group/Transition";

export type AnimationName =
	| "zoom-in-top"
	| "zoom-in-left"
	| "zoom-in-bottom"
	| "zoom-in-right"
	| "zoom-in-allscale";

type InnerProps = TransitionProps & {
	/** 需要自行添加css，动画名-enter，-enter-active,exit，-exit-active，原理就是改变类名产生动画效果 */
	classNames?: string;
};

export type TransitionProp = InnerProps & {
	/** 动画名称，需要别的动画设置classnames */
	animation?: AnimationName;
	/** 是否需要用div包一层，防止和已有元素的transition属性发生冲突 */
	wrapper?: boolean;
};

export const Transition: FC<TransitionProp> = (props) => {
	const { children, classNames, animation, wrapper, ...restProps } = props;
	return (
		<CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
			{wrapper ? <div>{children}</div> : children}
		</CSSTransition>
	);
};

Transition.defaultProps = {
	unmountOnExit: true,
	appear: true
};

export default Transition;
