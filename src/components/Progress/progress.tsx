import React, { useState, useMemo, useEffect, ReactNode } from "react";

interface ProgressType {
	/** 传入数字*/
	count: number;
	/** 是否要末尾计数文本*/
	countNumber?: boolean;
	/** 环状不生效 进度条高度*/
	height?: number;
	/** 是否是环状*/
	cicrle?: boolean;
	/** 环状才生效 环状大小*/
	size?: number;
	/**自定义环状进度条文本内容 */
	circleText?: ReactNode;
	/** 自定义长条进度条文本内容*/
	progressText?: ReactNode;
}

function Progress(props: ProgressType) {
	const { count, countNumber, height, cicrle, size, circleText, progressText } = props;
	const [state, setState] = useState(0);
	const [dasharray, setdashArray] = useState("");
	useMemo(() => {
		if (count < 0) {
			setState(0);
		} else if (count > 100) {
			setState(100);
		} else {
			setState(count);
		}
	}, [count]);
	useEffect(() => {
		if (cicrle) {
			let percent = state / 100;
			let perimeter = Math.PI * 2 * 170; //周长
			let dasharray = perimeter * percent + " " + perimeter * (1 - percent);
			setdashArray(dasharray);
		}
	}, [cicrle, state]);
	const render = useMemo(() => {
		if (cicrle) {
			return (
				<div className="bigbear-progress-circle">
					<svg
						width={size}
						height={size}
						className="bigbear-progress-circle-svg"
						viewBox="0 0 420 420"
						style={{ transform: "rotate(270deg)" }}
					>
						<defs>
							<radialGradient
								id="linear"
								r="100%"
								cx="100%"
								cy="100%"
								spreadMethod="pad"
							>
								<stop offset="0%" stopColor="#40a9ff" />
								<stop offset="100%" stopColor="#36cfc9" />
							</radialGradient>
						</defs>
						<circle
							cx="210"
							cy="210"
							r="170"
							strokeWidth="40"
							stroke="#f5f5f5"
							fill="none"
						></circle>
						<circle
							cx="210"
							cy="210"
							r="170"
							strokeWidth="40"
							stroke="url(#linear)"
							fill="none"
							opacity={state === 0 ? 0 : 1}
							strokeLinecap="round"
							strokeDasharray={dasharray}
							strokeDashoffset={"0px"}
							style={{
								transition:
									"stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s"
							}}
						></circle>
					</svg>
					<div
						className="bigbear-progress-circle-inner"
						style={{
							lineHeight: `${size! * 0.62}px`,
							width: `${size! * 0.62}px`,
							height: `${size! * 0.62}px`
						}}
					>
						{circleText ? circleText : `${state}%`}
					</div>
				</div>
			);
		} else {
			return (
				<div className="bigbear-progress-wrapper">
					<div className="bigbear-progress-bar">
						<div
							className="bigbear-progress-inner"
							style={{ width: `${state}%`, height: `${height ? height : 8}px` }}
						></div>
					</div>
					{countNumber && (
						<div
							className="bigbear-progress-number"
							style={{ lineHeight: `${height ? height : 8}px` }}
						>
							{progressText ? progressText : `${state}%`}
						</div>
					)}
				</div>
			);
		}
	}, [cicrle, circleText, countNumber, dasharray, height, progressText, size, state]);

	return <>{render}</>;
}

Progress.defaultProps = {
	countNumber: true,
	cicrle: false,
	size: 100
};

export default Progress;
