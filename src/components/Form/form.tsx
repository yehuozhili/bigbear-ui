import React, { PropsWithChildren, DOMAttributes } from "react";
import classnames from "classnames";

interface FormProps extends DOMAttributes<HTMLDivElement> {
	/** 额外类名*/
	className?: string;
}

function Form(props: PropsWithChildren<FormProps>) {
	const { children, ...restProps } = props;
	const classes = classnames("bigbear-form", props.className);

	return (
		<div className={classes} {...restProps}>
			{children && children}
		</div>
	);
}

export default Form;
