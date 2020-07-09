import React, {
	PropsWithChildren,
	useMemo,
	ReactNode,
	CSSProperties,
	useRef,
	useEffect
} from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import Icon from "../Icon";
import useStopScroll from "../../hooks/useStopScroll";
import Transition from "../Transition";

export interface ModalType {
	/** 父组件用来控制的状态 */
	visible: boolean;
	/** 容器位置 */
	container?: Element;
	/** 父组件用来改变显示状态的setState*/
	setState: React.Dispatch<React.SetStateAction<boolean>>;
	/** 弹出框标题 */
	title?: ReactNode;
	/** 是否有确认按钮 */
	confirm?: boolean;
	/** 改变确认按钮文本*/
	okText?: string;
	/** 改变取消按钮文本*/
	cancelText?: string;
	/** 点了确认的回调，如果传了，需要自行处理关闭 */
	onOk?: () => void;
	/** 点了取消的回调，如果传了，需要自行处理关闭*/
	onCancel?: () => void;
	/** 点确认或者取消都会走的回调 */
	callback?: (v: boolean) => void;
	/** 点击mask是否关闭模态框 */
	maskClose?: boolean;
	/** 是否有mask */
	mask?: boolean;
	/** 自定义模态框位置 */
	style?: CSSProperties;
	/** 是否有右上角关闭按钮 */
	closeButton?: boolean;
	/** 动画时间 */
	delay?: number;
	/** 额外类名 */
	className?: string;
	/** 是否停止滚动*/
	stopScroll?: boolean;
	/** portralstyle*/
	portralStyle?: CSSProperties;
	/** 默认确认按钮大小 */
	btnSize?: "default" | "sm" | "lg";
	/** portral的回调 */
	refCallback?: (ref: HTMLDivElement) => void;
	/** 没点确认于取消，直接关闭的回调 */
	closeCallback?: () => void;
}

function Modal(props: PropsWithChildren<ModalType>) {
	const {
		visible,
		maskClose,
		closeButton,
		delay,
		mask,
		container,
		confirm,
		okText,
		style,
		cancelText,
		onOk,
		onCancel,
		callback,
		title,
		setState,
		className,
		stopScroll,
		portralStyle,
		btnSize,
		refCallback,
		closeCallback
	} = props;
	const ref = useRef<HTMLDivElement>(null);
	const render = useMemo(() => {
		return createPortal(
			<Transition
				nodeRef={ref}
				in={visible}
				timeout={delay!}
				classNames={`bigbear-modal-animation`}
			>
				<div
					className={`bigbear-modal-potral ${visible ? "open" : ""} ${
						className ? className : ""
					}`}
					ref={ref}
					style={portralStyle}
				>
					<div
						className={`bigbear-modal-viewport ${className ? className : ""}`}
						style={style}
					>
						<div className={`bigbear-modal-title ${className ? className : ""}`}>
							{title && <span>{title}</span>}
							{closeButton && (
								<div
									className={`bigbear-modal-closebtn ${
										className ? className : ""
									}`}
								>
									<Button
										onClick={() => {
											setState(false);
											if (closeCallback) closeCallback();
										}}
										size={btnSize}
									>
										<Icon icon="times"></Icon>
									</Button>
								</div>
							)}
						</div>
						{props.children && (
							<div className={`bigbear-modal-children ${className ? className : ""}`}>
								{props.children}
							</div>
						)}
						{confirm && (
							<div className={`bigbear-modal-confirm ${className ? className : ""}`}>
								<Button
									onClick={() => {
										onOk ? onOk() : setState(false);
										if (callback) callback(true);
									}}
									size={btnSize}
								>
									{okText ? okText : "确认"}
								</Button>
								<Button
									onClick={() => {
										onCancel ? onCancel() : setState(false);
										if (callback) callback(false);
									}}
									size={btnSize}
								>
									{cancelText ? cancelText : "取消"}
								</Button>
							</div>
						)}
					</div>
					{mask && (
						<div
							className="bigbear-modal-mask"
							onClick={() => {
								if (maskClose) {
									setState(false);
									if (closeCallback) {
										closeCallback();
									}
								}
							}}
						></div>
					)}
				</div>
			</Transition>,
			container!
		);
	}, [
		btnSize,
		callback,
		cancelText,
		className,
		closeButton,
		closeCallback,
		confirm,
		container,
		delay,
		mask,
		maskClose,
		okText,
		onCancel,
		onOk,
		portralStyle,
		props.children,
		setState,
		style,
		title,
		visible
	]);
	useStopScroll(visible!, 300, stopScroll!);
	useEffect(() => {
		if (refCallback && ref.current) {
			refCallback(ref.current);
		}
	}, [refCallback]);
	return <div className="bigbear-modal-wrapper">{render}</div>;
}

Modal.defaultProps = {
	visible: false,
	container: window.document.body,
	confirm: true,
	title: "标题",
	maskClose: true,
	mask: true,
	closeButton: true,
	delay: 200,
	stopScroll: true,
	btnSize: "default"
};

export default Modal;
