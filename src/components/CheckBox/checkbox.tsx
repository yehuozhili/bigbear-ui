import React, { useState, PropsWithChildren, useMemo, CSSProperties } from "react";
import classnames from "classnames";

interface CheckBoxProps {
	/** 数据*/
	data: Array<string>;
	/** 默认选中索引*/
	defaultIndexArr?: Array<number>;
	/** 回调值 */
	callback?: (arr: Array<boolean>) => void;
	/** 额外类名 */
	className?: string;
	/** 禁用索引 */
	disableIndex?: Array<number>;
	/** 控制转移的onchange回调 */
	parentSetStateCallback?: (e: boolean[], index: number) => void;
	/**控制转移的state */
	parentState?: Array<boolean>;
	/** 是否显示文字 */
	text?: boolean;
	/** 外层容器样式，有时可能需要把box-shadow设置none*/
	style?: CSSProperties;
}

function CheckBox(props: PropsWithChildren<CheckBoxProps>) {
	const {
		defaultIndexArr,
		callback,
		data,
		className,
		disableIndex,
		parentSetStateCallback,
		parentState,
		style,
		text
	} = props;
	const classes = classnames("bigbear-checkbox-wrapper", className);

	const disableRef = useMemo(() => {
		let arr = new Array(data.length).fill(false);
		if (disableIndex) {
			disableIndex.forEach((v) => (arr[v] = true));
		}
		return arr;
	}, [data.length, disableIndex]);
	const initArr = useMemo(() => {
		let arr = new Array(data.length).fill(false);
		if (defaultIndexArr) {
			defaultIndexArr.forEach((v) => (arr[v] = true));
		}
		return arr;
	}, [data.length, defaultIndexArr]);
	const [state, setState] = useState<Array<boolean>>(initArr);
	return (
		<div className={classes} style={style}>
			{data.map((value, index) => {
				const judgeStateIndex = parentState ? parentState[index] : state[index];
				return (
					<label
						className={`bigbear-checkbox-label ${
							disableRef[index] ? "checkbox-disabled" : ""
						}`}
						key={index}
					>
						<input
							type="checkbox"
							className="bigbear-checkbox-input"
							checked={judgeStateIndex ? true : false}
							onChange={() => {
								if (parentState) {
									if (parentSetStateCallback)
										parentSetStateCallback(parentState, index);
									if (callback) callback(parentState);
								} else {
									if (!disableRef[index]) {
										state[index] = !state[index];
										setState([...state]);
										if (callback) callback(state);
									}
								}
							}}
						></input>
						<span
							className={`bigbear-checkbox-dot ${
								judgeStateIndex ? "checkbox-active" : ""
							}`}
						></span>
						{text ? <span className={"bigbear-checkbox-value"}>{value}</span> : null}
					</label>
				);
			})}
		</div>
	);
}

CheckBox.defaultProps = {
	data: [],
	text: true
};

export default CheckBox;
