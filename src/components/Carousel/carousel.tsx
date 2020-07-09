import React, {
	PropsWithChildren,
	useState,
	useMemo,
	ReactElement,
	ReactNode,
	useEffect,
	useRef
} from "react";
import Transition from "../Transition";

interface CarouselType {
	/** 默认索引*/
	defaultIndex?: number;
	/** 轮播图高度 */
	height?: number;
	/** 是否自动播放 */
	autoplay: boolean;
	/** 自动播放延迟 */
	autoplayDelay: number;
	/** 翻页动画延迟 */
	delay?: number;
}

function mapToState(map: [number, number, number], children: ReactNode, totalLen: number) {
	if (totalLen <= 1) {
		return [null, children, null];
	} else {
		return map.map((v) => {
			if (v === -1) {
				return null;
			} else {
				let child = children as ReactElement[];
				return child[v];
			}
		});
	}
}

function currentSetMap(current: number, map: [number, number, number]): [number, number, number] {
	let mid = map[1];
	if (mid === current) {
		return map;
	} else if (mid < current) {
		return [mid, current, -1];
	} else {
		return [-1, current, mid];
	}
}

interface AnimationType {
	in: boolean;
	direction: "" | "left" | "right";
}

function Carousel(props: PropsWithChildren<CarouselType>) {
	const { defaultIndex, delay, height, autoplay, autoplayDelay } = props;
	const [state, setState] = useState<ReactNode[]>([]);
	const [indexMap, setIndexMap] = useState<[number, number, number]>([-1, -1, -1]);
	const [animation, setAnimation] = useState<AnimationType>({ in: true, direction: "" });
	const [bound, setBound] = useState<DOMRect>();
	const totalLen = useMemo(() => {
		let len: number;
		if (props.children instanceof Array) {
			len = props.children.length;
		} else {
			len = 1;
		}
		return len;
	}, [props.children]);
	useMemo(() => {
		let map: [number, number, number] = [-1, -1, -1];
		map[1] = defaultIndex!;
		let res = mapToState(map, props.children, totalLen);
		setState(res);
		setIndexMap(map);
	}, [defaultIndex, props.children, totalLen]);

	useEffect(() => {
		let child = props.children as ReactElement[];
		if (child) {
			let tmp = indexMap.map((v) => {
				return v !== -1 ? child[v] : null;
			});
			let sign: boolean;

			setState(tmp);
			if (indexMap[0] === -1 && indexMap[2] === -1) {
				//首轮
				return;
			} else if (indexMap[0] === -1) {
				sign = true;
				setAnimation({ in: false, direction: "right" });
			} else {
				sign = false;
				setAnimation({ in: false, direction: "left" });
			}
			setTimeout(() => {
				if (sign) {
					setAnimation({ in: true, direction: "right" });
				} else {
					setAnimation({ in: true, direction: "left" });
				}
			}, delay!);
		}
	}, [delay, indexMap, props.children]);

	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const setBoundFunc = () => {
			if (ref.current) {
				let bounds = ref.current.getBoundingClientRect();
				setBound(bounds);
			}
		};
		setBoundFunc();
		const resizefunc = () => {
			setBoundFunc();
		};
		window.addEventListener("resize", resizefunc);
		return () => {
			window.removeEventListener("resize", resizefunc);
		};
	}, []);

	useEffect(() => {
		let timer: number;
		if (autoplay) {
			timer = window.setTimeout(() => {
				let y;
				if (indexMap[1] < totalLen - 1) {
					y = indexMap[1] + 1;
				} else {
					y = 0;
				}
				let newmap = currentSetMap(y, indexMap);
				setIndexMap(newmap);
			}, autoplayDelay);
		}
		return () => clearTimeout(timer);
	}, [autoplay, autoplayDelay, indexMap, totalLen]);
	const nodeRef = useRef(null);
	return (
		<div className="bigbear-carousel-wrapper" ref={ref} style={{ width: `100%` }}>
			<div
				className="bigbear-carousel-viewport"
				style={{ width: `100%`, height: `${height!}px` }}
			>
				<Transition
					nodeRef={nodeRef}
					in={animation.in}
					timeout={delay!}
					classNames={"bigbear-carousel"}
				>
					<div
						style={{
							display: "flex",
							width: `${bound?.width! * 3}px`,
							position: "absolute",
							left: `${-bound?.width!}px`
						}}
						className={animation.direction}
						ref={nodeRef}
					>
						{state.map((v, i) => (
							<div
								key={i}
								style={{
									width: `${bound?.width}px`,
									height: `${height!}px`,
									overflow: "hidden"
								}}
								className="bigbear-carousel-item"
							>
								{v}
							</div>
						))}
					</div>
				</Transition>
			</div>
			<ul className="bigbear-carousel-ul">
				{new Array(totalLen).fill(1).map((x, y) => {
					return (
						<li
							onClick={() => {
								let newmap = currentSetMap(y, indexMap);
								setIndexMap(newmap);
							}}
							className={`bigbear-carousel-li ${
								y === indexMap[1] ? "carousel-active" : ""
							}`}
							key={y}
						></li>
					);
				})}
			</ul>
		</div>
	);
}

Carousel.defaultProps = {
	defaultIndex: 0,
	delay: 100,
	height: 200,
	autoplay: true,
	autoplayDelay: 5000
};

export default Carousel;
