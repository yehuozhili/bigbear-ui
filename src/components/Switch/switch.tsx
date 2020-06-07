import React, { useState, PropsWithChildren } from "react";
import classNames from "classnames";

export interface SwitchProps {
	/** 底座颜色*/
	bottomType?:
		| "primary"
		| "default"
		| "danger"
		| "secondary"
		| "success"
		| "info"
		| "light"
		| "warning"
		| "dark";
	/** 按钮颜色*/
	btnType?:
		| "primary"
		| "default"
		| "danger"
		| "secondary"
		| "success"
		| "info"
		| "light"
		| "warning"
		| "dark";
	/** 大小*/
	switchSize?: "default" | "sm" | "lg";
	/** 禁用*/
	disabled: boolean;
	/** 默认开关*/
	defaultState: boolean;
	/** 选择后回调 */
	callback?: (v: boolean) => void;
	/** 改变状态前回调,需要返回状态值 */
	beforeChange?: (v: boolean) => boolean;
}

export function Switch(props: PropsWithChildren<SwitchProps>) {
	const {
		bottomType,
		btnType,
		switchSize,
		disabled,
		defaultState,
		callback,
		beforeChange
	} = props;
	const [checked, setChecked] = useState(defaultState);
	const labelClassName = classNames("bigbear-switch-label", {
		[`bigbear-switch-label-${bottomType}`]: bottomType,
		[`bigbear-switch-label-size-${switchSize}`]: switchSize,
		[`bigbear-switch-label-disabled`]: disabled
	});
	const switchCheckName = classNames("bigbear-switch-check", {
		[`bigbear-switch-check-${bottomType}`]: bottomType,
		[`bigbear-switch-check-size-${switchSize}`]: switchSize
	});
	const btnClassName = classNames("bigbear-switch-btn", {
		[`bigbear-switch-btn-${btnType}`]: btnType,
		[`bigbear-switch-btn-size-${switchSize}`]: switchSize
	});
	return (
		<label className={labelClassName}>
			<input
				type="checkbox"
				checked={checked}
				disabled={disabled}
				onChange={() => {
					let value = !checked;
					if (beforeChange) value = beforeChange(value);
					setChecked(value);
					if (callback) callback(value);
				}}
			></input>
			<span className={switchCheckName}></span>
			<span className={btnClassName}></span>
		</label>
	);
}

Switch.defaultProps = {
	bottomType: "default",
	btnType: "default",
	switchSize: "default",
	disabled: false,
	defaultState: false
};

export default Switch;
