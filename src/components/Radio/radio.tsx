import React, { useState, PropsWithChildren, useMemo } from "react";
import classnames from "classnames";

interface RadioProps {
	/** 数据*/
	data: Array<string>;
	/** 默认选中索引*/
	defaultIndex?: number;
	/** 回调值 */
	callback?: (arr: Array<boolean>) => void;
	/** 额外类名 */
	className?: string;
	/** 禁用索引 */
	disableIndex?: Array<number>;
}

function Radio(props: PropsWithChildren<RadioProps>) {
	const { defaultIndex, callback, data, className, disableIndex } = props;
	const disableRef = useMemo(() => {
		let arr = new Array(data.length).fill(false);
		if (disableIndex) {
			disableIndex.forEach((v) => (arr[v] = true));
		}
		return arr;
	}, [data.length, disableIndex]);

	const classes = classnames("bigbear-radio-wrapper", className);
	const [state, setState] = useState(
		new Array(data.length).fill(false).map((v, i) => (i === defaultIndex ? true : v))
	);
	return (
		<div className={classes}>
			{data.map((value, index) => {
				return (
					<label
						className={`bigbear-radio-label ${
							disableRef[index] ? "radio-disabled" : ""
						}`}
						key={index}
					>
						<input
							type="radio"
							className="bigbear-radio-input"
							checked={state[index]}
							onClick={() => {
								if (!disableRef[index]) {
									let newState = new Array(data.length).fill(false);
									newState[index] = true;
									setState(newState);
									if (callback) callback(newState);
								}
							}}
							onChange={() => {}}
						></input>
						<span
							className={`bigbear-radio-dot ${state[index] ? "radio-active" : ""}`}
						></span>
						<span className={"bigbear-radio-value"}>{value}</span>
					</label>
				);
			})}
		</div>
	);
}

Radio.defaultProps = {
	data: []
};

export default Radio;
