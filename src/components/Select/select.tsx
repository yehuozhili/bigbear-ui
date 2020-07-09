import React, {
	useState,
	ReactNode,
	useRef,
	PropsWithChildren,
	useEffect,
	CSSProperties
} from "react";
import useClickOutside from "../../hooks/useClickOutside";
import Icon from "../Icon";
import Transition from "../Transition/index";

interface SelectProps {
	/** 选框中数据 */
	data: Array<string>;
	/** 使用模板渲染，setState是设置展示元素的方法 setOpen控制开关*/
	renderTemplate?: (
		item: string,
		index: number,
		setState: React.Dispatch<React.SetStateAction<string>>,
		setOpen: React.Dispatch<React.SetStateAction<boolean>>
	) => ReactNode;
	/** 展示右侧的图标 */
	icon?: ReactNode;
	/** 选框中初始值 */
	defaultValue?: string;
	/** 下拉动画时间*/
	timeout?: number;
	/**选择的回调值 */
	callback?: (v: string) => void;
	/** 禁用*/
	disabled?: boolean;
	/** 外层容器样式*/
	style?: CSSProperties;
	/** 内层容器样式 */
	innerStyle?: CSSProperties;
}

function Select(props: PropsWithChildren<SelectProps>) {
	const {
		icon,
		defaultValue,
		timeout,
		renderTemplate,
		callback,
		data,
		disabled,
		style,
		innerStyle
	} = props;
	const [state, setState] = useState<string>(defaultValue!);
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	const nodeRef = useRef(null);
	useClickOutside(ref, () => setOpen(false));
	useEffect(() => {
		if (callback) callback(state);
	}, [callback, state]);
	return (
		<div className={`bigbear-select ${disabled ? "disabled" : ""}`} ref={ref} style={style}>
			<div
				className="bigbear-select-display"
				onClick={() => {
					if (!disabled) setOpen(!open);
				}}
			>
				<div className="bigbear-select-displaytext" style={innerStyle}>
					{state}
				</div>
				{icon ? <div className="bigbear-select-icon">{icon}</div> : null}
			</div>
			<Transition nodeRef={nodeRef} in={open} animation="zoom-in-top" timeout={timeout!}>
				<div ref={nodeRef} className="bigbear-select-options">
					{data.map((item, index) => {
						let renderRes = renderTemplate ? (
							renderTemplate(item, index, setState, setOpen)
						) : (
							<div
								onClick={() => {
									setState(item);
									setOpen(false);
								}}
								key={index}
							>
								{" "}
								{item}
							</div>
						);
						return renderRes;
					})}
				</div>
			</Transition>
		</div>
	);
}

Select.defaultProps = {
	icon: <Icon icon="angle-down"></Icon>,
	defaultValue: "",
	timeout: 300,
	data: [],
	disabled: false
};

export default Select;
