import React, { PropsWithChildren, useEffect, useState, ReactNode, CSSProperties } from "react";

type Props = PropsWithChildren<{
	/** 每个元素高 */

	itemHeight: number;
	/** 一行几个元素 */

	columnNumber?: number;
	/** 可视范围里几个元素 */
	insightNumber: number;
	/** 滚动到第一个元素的高度 */
	startHeight?: number;
	/** 有滚动条的dom */
	scrollDom: HTMLDivElement | null;
	/** 扩展行数*/
	scaleRow?: number;
	/** 装载完成回调函数*/
	onloadFunc?: () => void;
	/** 节流函数的延迟 */
	delay?: number;
	/** virtual-custom-item的额外样式 */
	style?: CSSProperties;
	/** 设置滚动条高度的误差调整 */
	scrollbar?: number;
}>;

export function throttle(fn: Function, delay: number) {
	let flag = true;
	return function(this: Function, ...args: Array<any>) {
		const context = this;
		if (flag) {
			flag = false;
			fn.apply(context, args);
			setTimeout(() => {
				flag = true;
			}, delay);
		}
	};
}

function VirtualList(props: Props) {
	const [costomHeight, setCostomHeight] = useState<number>();
	const [visbleHeight, setVisibleHeight] = useState<number>();
	const [renderChildren, setRenderChildren] = useState<Array<ReactNode>>();
	const [indexNumber, setIndexNumber] = useState({
		startIndex: 0,
		endIndex: props.insightNumber,
		overScroll: 0
	});
	useEffect(() => {
		if (props.children instanceof Array) {
			let childrenLen = props.children.length;
			if (childrenLen % props.columnNumber! !== 0) {
				//说明最后一行没满
				const remain = childrenLen % props.columnNumber!;
				childrenLen = childrenLen + remain;
			}
			const fullheight = (childrenLen / props.columnNumber!) * props.itemHeight;
			if (props.scrollbar) {
				setCostomHeight(fullheight + props.scrollbar);
			} else {
				setCostomHeight(fullheight);
			}
			let insightHeight;

			if (childrenLen < props.insightNumber) {
				//传来长度小于可视长度情况
				insightHeight = fullheight;
			} else {
				insightHeight = (props.insightNumber / props.columnNumber!) * props.itemHeight;
			}
			const scuRender = props.children.slice(indexNumber.startIndex, indexNumber.endIndex);
			setVisibleHeight(insightHeight);
			setRenderChildren(scuRender);
		}
	}, [
		props.children,
		indexNumber,
		props.columnNumber,
		props.itemHeight,
		props.insightNumber,
		props.scrollbar
	]);

	useEffect(() => {
		const scrollFunc = (e: Event) => {
			const target = e.target as HTMLDivElement;
			let overScroll = target.scrollTop - props.startHeight!; //卷曲高度
			let timer = (overScroll / props.itemHeight) * props.columnNumber!;
			let startIndex = Math.floor(timer); //起始索引 从0开始
			startIndex = startIndex < 0 ? 0 : startIndex;
			timer = (timer % props.columnNumber!) / props.columnNumber!; //滚的每行百分比
			if (timer < 0) timer = 0;
			if (overScroll < 0) overScroll = 0;
			if (startIndex % props.columnNumber! !== 0) {
				//每行没补满
				startIndex = startIndex - (startIndex % props.columnNumber!);
			}
			const endIndex = startIndex + props.insightNumber + props.scaleRow!;
			overScroll = overScroll - timer * props.itemHeight;
			setTimeout(() => {
				setIndexNumber({
					startIndex,
					endIndex,
					overScroll
				});
			});
		};
		const combinedFunc = throttle(scrollFunc, props.delay!);
		if (props.scrollDom) {
			props.scrollDom.addEventListener("scroll", combinedFunc);
		}
		if (props.onloadFunc) props.onloadFunc();
		return () => {
			if (props.scrollDom) props.scrollDom.removeEventListener("scroll", combinedFunc);
		};
	}, [props]);
	return (
		<>
			<div className="virtual-container">
				<div
					style={{
						height: costomHeight ? costomHeight : 0
					}}
				></div>
				<div
					className="virtual-custom-item"
					style={{
						height: visbleHeight ? visbleHeight : 0,
						position: "relative",
						transform: `translateY(${indexNumber.overScroll}px)`,
						...props.style
					}}
				>
					{renderChildren}
				</div>
			</div>
		</>
	);
}

VirtualList.defaultProps = {
	scaleRow: 2,
	delay: 50,
	columnNumber: 1,
	startHeight: 0
};

export default VirtualList;
