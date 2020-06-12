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
import Transition from "../Transition";
import Alert from "../Alert";
import { unstable_batchedUpdates } from "react-dom";

interface MultiSelectProps {
	/** 选框中数据 */
	data: Array<string>;
	/** 默认选中索引*/
	defaultIndex?: Array<number>;
	/** 展示右侧的图标 */
	icon?: ReactNode;
	displayType?:
		| "primary"
		| "default"
		| "danger"
		| "secondary"
		| "success"
		| "info"
		| "light"
		| "warning"
		| "dark";
	/** 下拉动画时间*/
	timeout?: number;
	/**选择的回调值 */
	callback?: (v: Array<string>) => void;
	/** 禁用*/
	disabled?: boolean;
	/** 选项框样式 */
	optionStyle?: CSSProperties;
	/** 显示框样式 */
	displayStyle?: CSSProperties;
	itemTimeout?: number;
}

const mapToState = function(
	data: string[],
	datamap: number[],
	setState: React.Dispatch<React.SetStateAction<string[]>>
) {
	if (datamap.length === 0) {
		setState([]);
	} else {
		let newState: Array<string> = [];
		datamap.forEach((v) => {
			newState.push(data[v]);
		});
		setState(newState);
	}
};

function MultiSelect(props: PropsWithChildren<MultiSelectProps>) {
	const {
		icon,
		timeout,
		callback,
		data,
		disabled,
		displayType,
		optionStyle,
		displayStyle,
		defaultIndex,
		itemTimeout
	} = props;
	const [state, setState] = useState<Array<string>>(() => {
		if (defaultIndex) {
			return defaultIndex.map((v) => data[v]);
		} else {
			return [];
		}
	});
	const [datamap, setDataMap] = useState<Array<number>>(defaultIndex ? defaultIndex : []); //增加时候可能会有重名所以要map
	const [open, setOpen] = useState(() => false);
	const ref = useRef(null);
	useClickOutside(ref, () => setOpen(false));
	useEffect(() => {
		if (callback) callback(state);
	}, [callback, state]);

	return (
		<div className={`bigbear-multiselect ${disabled ? "disabled" : ""}`} ref={ref}>
			<div
				className="bigbear-multiselect-display"
				onClick={() => {
					if (!disabled) setOpen(!open);
				}}
				style={displayStyle}
			>
				<div className="bigbear-multiselect-displaytext">
					{state.map((item, index) => {
						return (
							<Alert
								key={datamap[index]}
								title={item}
								close={true}
								type={displayType}
								timeout={itemTimeout}
								initiativeCloseCallback={(setAlert, e) => {
									e.stopPropagation();
									setAlert(false);
									setTimeout(() => {
										unstable_batchedUpdates(() => {
											datamap.splice(index, 1);
											mapToState(data, datamap, setState);
											setDataMap([...datamap]);
										});
									}, itemTimeout);
								}}
							></Alert>
						);
					})}
				</div>
				{icon ? <div className="bigbear-multiselect-icon">{icon}</div> : null}
			</div>
			<Transition in={open} animation="zoom-in-top" timeout={timeout!}>
				<div className="bigbear-multiselect-options" style={optionStyle}>
					{data.map((item, index) => {
						let renderRes = (
							<div
								onClick={() => {
									let res = datamap.indexOf(index);
									if (res === -1) {
										const newmap = [...datamap, index];
										setDataMap(newmap);
										mapToState(data, newmap, setState);
									} else {
										datamap.splice(res, 1);
										setDataMap([...datamap]);
										mapToState(data, datamap, setState);
									}
								}}
								key={index}
								className={
									datamap.indexOf(index) === -1
										? ""
										: "bigbear-multiselect-active"
								}
							>
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

MultiSelect.defaultProps = {
	icon: <Icon icon="angle-down"></Icon>,
	timeout: 300,
	data: [],
	disabled: false,
	displayType: "default",
	optionStyle: { maxHeight: "500px" },
	displayStyle: { minHeight: "43px" },
	defaultIndex: [],
	itemTimeout: 300
};

export default MultiSelect;
