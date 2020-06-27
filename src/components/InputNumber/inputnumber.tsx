import React, { useState } from "react";
import Icon from "../Icon";
import Button from "../Button";
import Input, { InputProps } from "../Input/input";

function transformCalc(value: string, add: boolean, tmp: number) {
	if (add) {
		return parseInt(value) + tmp + "";
	} else {
		return parseInt(value) - tmp + "";
	}
}
function transformString(v: string, maxNumber: number | undefined, minNumber: number | undefined) {
	if (v === "") {
		return "";
	} else {
		if (maxNumber && parseInt(v) > maxNumber) {
			return maxNumber + "";
		}
		if (minNumber && parseInt(v) < minNumber) {
			return minNumber + "";
		}
		return parseInt(v) + "";
	}
}

export interface InputNumberProps extends Omit<InputProps, "value"> {
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
	defaultValue?: string;
	/** 控制2个按钮初始状态 */
	initialVisible?: boolean;
	/** 外层容器类名 */
	className?: string;
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
		...restProps
	} = props;
	const [state, setState] = useState(defaultValue!);
	const [visible, setVisible] = useState(initialVisible!);
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
		<div className={`bigbear-inputnumber-wrapper ${className}`} style={{ width }}>
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
				<Input value={state} setValueCallback={handleOnchange} {...restProps}></Input>
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
	defaultValue: "0",
	initialVisible: false
};

export default InputNumber;
