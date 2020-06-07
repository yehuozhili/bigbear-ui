import React, { useRef, useState, useEffect } from "react";
import VirtualList from "./virtuallist";

function MyVirtualList() {
	const cRef = useRef(null);
	const [state, setState] = useState(null);
	useEffect(() => {
		setState(cRef.current);
	}, []);
	return (
		<div style={{ overflow: "scroll", height: "500px" }} ref={cRef}>
			<VirtualList itemHeight={39} insightNumber={12} scrollDom={state}>
				{new Array(100).fill(1).map((x, y) => (
					<div className={"bigbear-list-item"} key={y}>
						{y}
					</div>
				))}
			</VirtualList>
		</div>
	);
}
export default MyVirtualList;

function DoubleVirtual() {
	const cRef = useRef(null);
	const [state, setState] = useState(null);
	useEffect(() => {
		setState(cRef.current);
	}, []);
	return (
		<div style={{ overflow: "scroll", height: "500px" }} ref={cRef}>
			<VirtualList
				itemHeight={44}
				insightNumber={22}
				scrollDom={state}
				scrollbar={14}
				columnNumber={2}
				style={{ display: "flex", flexWrap: "wrap" }}
			>
				{new Array(100).fill(1).map((x, y) => (
					<div style={{ width: "50%" }} key={y}>
						<div className={"bigbear-list-item"}>{y}</div>
					</div>
				))}
			</VirtualList>
		</div>
	);
}

export { DoubleVirtual };
