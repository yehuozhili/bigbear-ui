import React, {
	PropsWithChildren,
	ReactNode,
	useEffect,
	useRef,
	useState,
	CSSProperties
} from "react";
import Modal from "../Modal";
import { ModalType } from "../Modal/modal";

export interface PopconfirmProps extends Partial<ModalType> {
	/** 由于modal有children，所以使用wrapperNode来进行传递，被包裹的元素 */
	wrapperNode: ReactNode;
	/** 显示于包裹元素方位 */
	directions?: PopDirections;
	/** 是否点击触发 */
	click?: boolean;
	/** 是否hover触发*/
	hover?: boolean;
}

export type PopDirections =
	| "TL"
	| "TOP"
	| "TR"
	| "LT"
	| "LEFT"
	| "LB"
	| "BL"
	| "BOTTOM"
	| "BR"
	| "RT"
	| "RIGHT"
	| "RB";

interface DefaultParameter {
	mask: boolean;
	className: string;
	stopScroll: false;
	btnSize: "sm";
}

function switchPosition(
	sign: PopDirections,
	modalrect: DOMRect,
	popconfirmrect: DOMRect,
	scroll: number
): CSSProperties {
	let triangle = 5; //小三角高度
	switch (sign) {
		case "TL":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left: popconfirmrect.left
			};
		case "TOP":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left: popconfirmrect.left - modalrect.width / 2 + popconfirmrect.width / 2
			};
		case "TR":
			return {
				top: popconfirmrect.top + scroll - modalrect.height - triangle,
				left: popconfirmrect.left - modalrect.width + popconfirmrect.width
			};
		case "LT":
			return {
				top: popconfirmrect.top + scroll,
				left: popconfirmrect.left - modalrect.width - triangle
			};
		case "LEFT":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height / 2 - modalrect.height / 2,
				left: popconfirmrect.left - modalrect.width - triangle
			};
		case "LB":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height - modalrect.height,
				left: popconfirmrect.left - modalrect.width - triangle
			};
		case "BL":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
				left: popconfirmrect.left
			};
		case "BOTTOM":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
				left: popconfirmrect.left + popconfirmrect.width / 2 - modalrect.width / 2
			};
		case "BR":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height + triangle,
				left: popconfirmrect.left + popconfirmrect.width - modalrect.width
			};
		case "RT":
			return {
				top: popconfirmrect.top + scroll,
				left: popconfirmrect.left + popconfirmrect.width + triangle
			};
		case "RIGHT":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height / 2 - modalrect.height / 2,
				left: popconfirmrect.left + popconfirmrect.width + triangle
			};
		case "RB":
			return {
				top: popconfirmrect.top + scroll + popconfirmrect.height - modalrect.height,
				left: popconfirmrect.left + popconfirmrect.width + triangle
			};
		default:
			console.error("you may pass error directions" + sign);
			return {};
	}
}

function Popconfirm(props: PropsWithChildren<PopconfirmProps>) {
	const { wrapperNode, directions, visible, setState, click, hover, ...restprops } = props;
	const defaultPropsConfirmParameter: DefaultParameter = {
		mask: false,
		className: `bigbear-popconfirm popconfirm-${directions}`,
		stopScroll: false,
		btnSize: "sm"
	};
	const mergeOption = { ...defaultPropsConfirmParameter, ...restprops };
	const [style, setStyle] = useState<CSSProperties>({});
	const [modalRef, setModalRef] = useState<HTMLDivElement>();
	const [innerstate, setInnerState] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const refcallback = (ref: HTMLDivElement) => {
		setModalRef(ref);
	};
	useEffect(() => {
		if (ref.current && modalRef) {
			const scroll = document.documentElement.scrollTop + document.body.scrollTop; //移动端可能取不到
			let res = switchPosition(
				directions!,
				modalRef.getBoundingClientRect(),
				ref.current.getBoundingClientRect(),
				scroll
			);
			setStyle(res);
		}
	}, [directions, modalRef]);
	return (
		<div
			className="bigbear-popconfirm-wrapper"
			ref={ref}
			onClick={click ? () => setInnerState(!innerstate) : undefined}
			onMouseEnter={hover ? () => setInnerState(true) : undefined}
			onMouseLeave={hover ? () => setInnerState(false) : undefined}
		>
			{wrapperNode}
			<Modal
				visible={setState ? visible : innerstate}
				setState={setState ? setState : setInnerState}
				{...mergeOption}
				portralStyle={style}
				refCallback={refcallback}
			></Modal>
		</div>
	);
}

Popconfirm.defaultProps = {
	directions: "TOP",
	click: true,
	hover: false
};

export default Popconfirm;
