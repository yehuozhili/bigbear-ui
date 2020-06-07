import React, { PropsWithChildren } from "react";
import classnames from "classnames";

interface FormProps {
	/** 额外类名*/
	className?: string;
}

function Form(props: PropsWithChildren<FormProps>) {
	const classes = classnames("bigbear-form", props.className);

	return <div className={classes}>{props.children && props.children}</div>;
}

export default Form;
