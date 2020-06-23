import React, { FC, ReactNode } from "react";
import Alert from "../Alert";
import { createPortal } from "react-dom";
import { AlertProps } from "../Alert/alert";
import ReactDOM from "react-dom";
import Icon from "../Icon";

export type DirectionType = "top" | "lt" | "lb" | "rt" | "rb";

export interface MessageProps {
	/**标题内容 */
	title?: string;
	/**容器 */
	container?: Element | null;
	/**类型 */
	type?:
		| "primary"
		| "default"
		| "danger"
		| "secondary"
		| "success"
		| "info"
		| "light"
		| "warning"
		| "dark";
	/** 位于container的方向 */
	directions?: "top" | "lt" | "lb" | "rt" | "rb";
	/** 自动关闭延迟 */
	autoclosedelay?: number;
	/** 图标 */
	icon?: ReactNode;
	/** 额外类名 */
	className?: string;
	/**参考alert */
	closeCallback?: () => void;
	/** 文本内容*/
	description?: string;
	/**  关闭按钮 */
	close?: boolean;
	/** 动画时间 */
	timeout?: number;
}

function directionSelect(directions: DirectionType) {
	if (directions === "top") {
		return "top";
	} else if (directions === "lt" || directions === "lb") {
		return "left";
	} else if (directions === "rt" || directions === "rb") {
		return "right";
	} else {
		return "bottom";
	}
}

function createContainer() {
	let container = document.createElement("div");
	container.className = "bigbear-message-factory";
	container = document.body.appendChild(container);
	let closeCallback = () => container.parentElement!.removeChild(container);
	return {
		container,
		closeCallback
	};
}

export const Message: FC<MessageProps> = function(props: MessageProps) {
	let {
		title,
		container,
		close,
		directions,
		autoclosedelay,
		icon,
		type,
		className,
		closeCallback,
		description,
		timeout
	} = props;
	if (!container) {
		let createObj = createContainer();
		container = createObj.container;
		closeCallback = () =>
			setTimeout(() => {
				createObj.closeCallback();
			}, timeout);
	}
	let select: AlertProps["directions"] = directionSelect(directions as DirectionType);
	const animateclass = directions === "top" ? "zoom-in-topmesssage" : undefined;
	return createPortal(
		<Alert
			title={title}
			className={`bigbear-message-${directions} bigbear-message ${
				className ? className : ""
			}`}
			autoclosedelay={autoclosedelay}
			icon={icon}
			type={type}
			initAnimate={true}
			directions={select}
			closeCallback={closeCallback}
			animateClassName={animateclass}
			description={description}
			close={close}
			timeout={timeout}
		></Alert>,
		container
	);
};

Message.defaultProps = {
	title: "",
	type: "default",
	directions: "top",
	autoclosedelay: 3000,
	close: false,
	timeout: 300
};

const defaultOptions = {
	directions: "top",
	description: undefined,
	icon: undefined as ReactNode,
	timeout: 300
};

const defaultIcon = {
	default: undefined,
	primary: <Icon icon="bell" theme="default"></Icon>,
	danger: <Icon icon="times-circle" theme="default"></Icon>,
	warning: <Icon icon="exclamation-circle" theme="dark"></Icon>,
	info: <Icon icon="info-circle" theme="default"></Icon>,
	secondary: <Icon icon="bookmark" theme="default"></Icon>,
	success: <Icon icon="check-circle" theme="default"></Icon>,
	light: <Icon icon="map-marker-alt" theme="dark"></Icon>,
	dark: <Icon icon="atom" theme="default"></Icon>
};

function messageRender(str: string, messageType: AlertProps["type"], options: DefaultOptionsType) {
	defaultOptions.icon = defaultIcon[messageType!];
	let mergeOptions = { ...defaultOptions, ...options };
	let container = document.createElement("div");
	container.className = "bigbear-message-factory";
	container = document.body.appendChild(container);
	const closeCallback = () =>
		setTimeout(() => {
			container.parentElement!.removeChild(container);
		}, mergeOptions.timeout);
	let dom = document.createElement("div");
	dom.className = "bigbear-message-factory-item";
	container.appendChild(dom);
	return ReactDOM.render(
		<Message
			title={str}
			type={messageType}
			icon={mergeOptions.icon}
			directions={mergeOptions.directions as DirectionType}
			closeCallback={closeCallback}
			container={container}
			description={mergeOptions.description}
			autoclosedelay={mergeOptions.autoclosedelay}
			close={mergeOptions.close}
			timeout={mergeOptions.timeout}
		></Message>,
		container
	);
}

interface DefaultOptionsType {
	directions?: DirectionType;
	description?: string | undefined;
	icon?: ReactNode;
	autoclosedelay?: number;
	close?: boolean;
}

const message = {
	default: (str: string, options: DefaultOptionsType = {}) =>
		messageRender(str, "default", options),
	primary: (str: string, options: DefaultOptionsType = {}) =>
		messageRender(str, "primary", options),
	danger: (str: string, options: DefaultOptionsType = {}) =>
		messageRender(str, "danger", options),
	warning: (str: string, options: DefaultOptionsType = {}) =>
		messageRender(str, "warning", options),
	info: (str: string, options: DefaultOptionsType = {}) => messageRender(str, "info", options),
	secondary: (str: string, options: DefaultOptionsType = {}) =>
		messageRender(str, "secondary", options),
	success: (str: string, options: DefaultOptionsType = {}) =>
		messageRender(str, "success", options),
	light: (str: string, options: DefaultOptionsType = {}) => messageRender(str, "light", options),
	dark: (str: string, options: DefaultOptionsType = {}) => messageRender(str, "dark", options)
};

export default Message;
export { message };
