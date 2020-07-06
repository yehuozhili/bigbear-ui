import React, {
	FC,
	InputHTMLAttributes,
	ReactElement,
	ChangeEvent,
	useState,
	useEffect,
	useRef
} from "react";
import classNames from "classnames";

export interface InputProps extends InputHTMLAttributes<HTMLElement> {
	/**禁用 */
	disabled?: boolean;
	/**输入框前面内容 */
	prepend?: string | ReactElement;
	/**输入框后面内容 */
	append?: string | ReactElement;
	/**受控输入框的回调事件，用来取值 */
	callback?: (e: ChangeEvent<HTMLInputElement>) => void;
	/**ref回调，可以拿到输入框实例 */
	refcallback?: (e: any) => void;
	/**默认值 */
	defaultValue?: string;
	/**父组件接管受控组件,父组件传value属性做state */
	setValueCallback?: (v: string) => void;
	/** 父组件接管状态时传递 */
	value?: string | undefined;
	/** 组件高度*/
	height?: string;
}

export const Input: FC<InputProps> = (props: InputProps) => {
	const {
		disabled,
		prepend,
		append,
		style,
		callback,
		defaultValue,
		refcallback,
		setValueCallback,
		value,
		height,
		...restProps
	} = props;
	const cnames = classNames("bigbear-input-wrapper", {
		"is-disabled": disabled,
		"input-group-append": !!append,
		"input-group-prepend": !!prepend
	});
	const [inputvalue, setValue] = useState(defaultValue || "");
	let ref = useRef(null);
	useEffect(() => {
		if (refcallback) refcallback(ref);
	}, [refcallback, setValueCallback]);

	return (
		<div className={cnames} style={style}>
			{prepend && (
				<div className="bigbear-input-group-prepend" style={{ height }}>
					{prepend}
				</div>
			)}
			<input
				ref={ref}
				style={{ height }}
				className="bigbear-input-inner"
				disabled={disabled}
				value={setValueCallback ? value : inputvalue}
				onChange={(e) => {
					setValueCallback ? setValueCallback(e.target.value) : setValue(e.target.value);
					if (callback) callback(e);
				}}
				{...restProps}
			/>
			{append && (
				<div className="bigbear-input-group-append" style={{ height }}>
					{append}
				</div>
			)}
		</div>
	);
};

export default Input;
