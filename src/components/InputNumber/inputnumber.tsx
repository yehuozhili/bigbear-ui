import React, { useState } from "react";
import Icon from "../Icon";
import Button from "../Button";
import Input, { InputProps } from "../Input/input";
import { ButtonProps } from "../Button/button";
import useControlReverse from "../../hooks/useControlReverse";

function betterparseInt(value: string) {
	let res = parseInt(value);
	if (isNaN(res)) {
		return 0;
	} else {
		return res;
	}
}

function transformCalc(value: string, add: boolean, tmp: number) {
	if (add) {
		return betterparseInt(value) + tmp + "";
	} else {
		return betterparseInt(value) - tmp + "";
	}
}
function transformString(v: string, maxNumber: number | undefined, minNumber: number | undefined) {
	if (v === "") {
		return "";
	} else {
		if (maxNumber && betterparseInt(v) > maxNumber) {
			return maxNumber + "";
		}
		if (minNumber && betterparseInt(v) < minNumber) {
			return minNumber + "";
		}
		return betterparseInt(v) + "";
	}
}

export interface InputNumberProps extends Omit<InputProps, "defaultValue"> {
	/** 容器宽度*/
	width?: number;
	/**输入框宽度 */
	inputWidth?: number;
	/** 选中后变化宽度*/
	extraWidth?: number;
	/** 左右2边按钮的步长*/
	step?: number;
	/** 回调取值 */
	inputNumberCallback?: (e: string) => void;
	/** 最大上限 */
	maxNumber?: number;
	/** 最小下限 */
	minNumber?: number;
	/** 初始值*/
	defaultValue?: number;
	/** 控制2个按钮初始状态 */
	initialVisible?: boolean;
	/** 外层容器类名 */
	className?: string;
	/** 两边按钮配置属性*/
	btnProps?: ButtonProps;
	/** 父组件接管的input值，注意！传的是string */
	parentValue?: string;
	/** 父组件接管的setstate值，注意！dispatch的是string */
	parentSetState?: React.Dispatch<React.SetStateAction<string>>;
	/** input的高*/
	height: string;
	/** 不使用内部验证器，自定义验证器*/
	customValidate?: (e: string, setState: React.Dispatch<React.SetStateAction<string>>) => string;
}

function validateNumber(v: string) {
	return /^[0-9]+$/.exec(v);
}

function InputNumber(props: InputNumberProps) {
	const {
		width,
		inputWidth,
		extraWidth,
		step,
		customValidate,
		maxNumber,
		minNumber,
		inputNumberCallback,
		defaultValue,
		initialVisible,
		className,
		btnProps,
		height,
		parentSetState,
		parentValue,
		...restProps
	} = props;
	const [innerState, setInnerState] = useState(defaultValue! + "");
	const [visible, setVisible] = useState(initialVisible!);

	const [state, setState] = useControlReverse(
		innerState,
		parentValue,
		setInnerState,
		parentSetState
	);

	const handleOnchange = (e: string) => {
		if (customValidate) {
			const res = customValidate(e, setState);
			if (inputNumberCallback) inputNumberCallback(res);
		} else {
			if (validateNumber(e) || e === "") {
				const res = transformString(e, maxNumber, minNumber);
				setState(res);
				if (inputNumberCallback) inputNumberCallback(res);
			} else {
				setState((prev) => {
					if (inputNumberCallback) inputNumberCallback(prev);
					return prev;
				});
			}
		}
	};
	return (
		<div
			className={`bigbear-inputnumber-wrapper ${className ? className : ""}`}
			style={{ width }}
		>
			<div
				className={`bigbear-inputnumber-prev`}
				style={{ display: visible ? "inline-block" : "none" }}
			>
				<Button
					onClick={() =>
						setState((prev) => {
							const res = transformString(
								transformCalc(prev, false, step!),
								maxNumber,
								minNumber
							);
							if (inputNumberCallback) inputNumberCallback(res);
							return res;
						})
					}
					{...btnProps}
				>
					<Icon icon="angle-left"></Icon>
				</Button>
			</div>

			<div
				className="bigbear-inputnumber-main"
				style={{ width: `${visible ? inputWidth! + extraWidth! : inputWidth}px` }}
				onClick={() => {
					setVisible(!visible);
				}}
			>
				<Input
					value={state}
					setValueCallback={handleOnchange}
					{...{ height: height }}
					{...restProps}
				></Input>
			</div>
			<div
				className="bigbear-inputnumber-next"
				style={{ display: visible ? "inline-block" : "none" }}
			>
				<Button
					onClick={() =>
						setState((prev) => {
							const res = transformString(
								transformCalc(prev, true, step!),
								maxNumber,
								minNumber
							);
							if (inputNumberCallback) inputNumberCallback(res);
							return res;
						})
					}
					{...btnProps}
				>
					<Icon icon="angle-right"></Icon>
				</Button>
			</div>
		</div>
	);
}

InputNumber.defaultProps = {
	width: 200,
	inputWidth: 50,
	extraWidth: 20,
	step: 1,
	defaultValue: 0,
	initialVisible: false,
	height: "32px"
};

export default InputNumber;
