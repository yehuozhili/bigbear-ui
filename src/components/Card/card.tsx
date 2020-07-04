import React, { PropsWithChildren, ReactNode, CSSProperties } from "react";
import classNames from "classnames";
import Avatar from "../Avatar";
import { AvatarProps } from "../Avatar/avatar";
export type normalType =
	| "primary"
	| "default"
	| "danger"
	| "secondary"
	| "success"
	| "info"
	| "light"
	| "warning"
	| "dark";

export interface CardProps {
	/** 卡片类型结构 */
	type?: "default" | "id";
	/** 是*/
	style?: CSSProperties;
	/** 显示的图片 */
	img?: ReactNode;
	/** 头像传参，参考avatar组件*/
	avatarProps?: PropsWithChildren<AvatarProps>;
	/** 头像旁区域 */
	idText?: ReactNode;
	/** 底部标题，也可以通过children自定义 */
	bottomTitle?: ReactNode;
	/** 底部描述，也可以通过children自定义 */
	bottomDescription?: ReactNode;
	/** 卡片底座颜色 */
	cardType?: normalType;
	/** 卡片底座凹凸 */
	elevateCard?: "block" | "wrapper";
	/** 卡片上部颜色 */
	imgType?: normalType;
	/** 卡片上部凹凸 */
	elevateImg?: "block" | "wrapper";
	/** 卡片底部颜色 */
	bottomType?: normalType;
	/** 卡片底部凹凸 */
	elevateBottom?: "block" | "wrapper";
	/** 外部容器额外类名 */
	className?: string;
}

function Card(props: PropsWithChildren<CardProps>) {
	const {
		type,
		style,
		img,
		cardType,
		imgType,
		className,
		bottomType,
		elevateCard,
		elevateImg,
		elevateBottom,
		children,
		bottomTitle,
		bottomDescription,
		avatarProps,
		idText
	} = props;
	const wrapperClass = classNames("bigbear-card-wrapper", className, {
		[`bigbear-layout-${elevateCard}-${cardType}`]: cardType
	});
	const imgClass = classNames("bigbear-card-img", {
		[`bigbear-layout-${elevateImg}-${imgType}`]: imgType
	});
	const bottomClass = classNames("bigbear-card-bottom", {
		[`bigbear-layout-${elevateBottom}-${bottomType}`]: bottomType
	});
	return (
		<div className={wrapperClass} style={style}>
			<div className={imgClass}>
				{type === "default" && img}

				{type === "id" && (
					<div className="bigbear-card-id">
						<Avatar {...avatarProps}></Avatar>
						<div className="bigbear-card-text">{idText}</div>
					</div>
				)}
			</div>
			<div className={bottomClass}>
				<div className="bigbear-card-btitle">{bottomTitle}</div>
				<div className="bigbear-card-bsubs">{bottomDescription}</div>
				{children}
			</div>
		</div>
	);
}

Card.defaultProps = {
	type: "default",
	cardType: "default",
	elevateCard: "block",
	imgType: "default",
	elevateImg: "block",
	bottomType: "default",
	elevateBottom: "block"
};

export default Card;
