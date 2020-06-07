import React, { PropsWithChildren, useMemo, useState } from "react";
import Icon from "../Icon";
import Button from "../Button";

interface PaginationProps {
	/** 每页显示多少条*/
	pageSize?: number;
	/** 默认显示第几页 */
	defaultCurrent?: number;
	/** 总共条数*/
	total: number;
	/** 分页条目最大显示长度 */
	barMaxSize?: number;
	/** 回调页数 */
	callback?: (v: number) => void;
}

function calculateMove(current: number, state: number[], totalPage: number): number[] | null {
	let mid = Math.floor(state.length / 2);
	let arr;
	let minus = current - state[mid];
	if (minus === 0) {
		arr = null;
	} else if (minus > 0) {
		let tmp = state[state.length - 1];
		if (tmp + minus < totalPage) {
			arr = state.map((v) => v + minus);
		} else {
			if (tmp === totalPage) {
				arr = null;
			} else {
				arr = state.map((v) => v + totalPage - tmp);
			}
		}
	} else {
		//负数
		if (state[0] + minus > 1) {
			arr = state.map((v) => v + minus);
		} else {
			//边缘，看最大能减几
			if (state[0] === 1) {
				arr = null;
			} else {
				arr = state.map((v) => v - state[0] + 1);
			}
		}
	}
	return arr;
}

function Pagination(props: PropsWithChildren<PaginationProps>) {
	const { total, pageSize, defaultCurrent, barMaxSize, callback } = props;
	const [state, setState] = useState<Array<number>>([]);
	const [current, setCurrent] = useState(defaultCurrent!);
	const totalPage = useMemo(() => {
		let number = Math.ceil(total / pageSize!);
		if (number > barMaxSize!) {
			let statetmp = new Array(barMaxSize).fill(1).map((x, y) => y + 1);
			setState(statetmp);
			let arr = calculateMove(defaultCurrent!, statetmp, number);
			if (arr) {
				setState(arr);
			}
		} else {
			let statetmp = new Array(number).fill(1).map((x, y) => y + 1);
			setState(statetmp);
			let arr = calculateMove(defaultCurrent!, statetmp, number);
			if (arr) {
				setState(arr);
			}
		}
		return number;
	}, [barMaxSize, defaultCurrent, pageSize, total]);

	return (
		<ul className="bigbear-pagination-wrapper">
			<li className="bigbear-pagination-up">
				<Button
					disabled={current === 1 ? true : false}
					onClick={() => {
						if (state && state[0] > 1) {
							let statetmp = state.map((x) => x - 1);
							setState(statetmp);
							setCurrent(current - 1);
							let arr = calculateMove(current - 1, statetmp, totalPage);
							if (arr) {
								setState(arr);
							}
							if (callback) callback(current - 1);
						} else {
							if (current !== state[0]) {
								setCurrent(current - 1);
								let arr = calculateMove(current - 1, state, totalPage);
								if (arr) {
									setState(arr);
								}
								if (callback) callback(current - 1);
							}
						}
					}}
				>
					<Icon icon="angle-left"></Icon>
				</Button>
			</li>
			{state.map((x, i) => {
				return (
					<li
						className={`bigbear-pagination-item ${
							current === x ? "pagination-active" : ""
						}`}
						key={i}
					>
						<Button
							btnType={current === x ? "primary" : "default"}
							onClick={() => {
								setCurrent(x);
								let arr = calculateMove(x, state, totalPage);
								if (arr) {
									setState(arr);
								}

								if (callback) callback(x);
							}}
						>
							{x}
						</Button>
					</li>
				);
			})}
			<li className="bigbear-pagination-down">
				<Button
					disabled={current === totalPage ? true : false}
					onClick={() => {
						if (state && state[barMaxSize! - 1] < totalPage) {
							let statetmp = state.map((x) => x + 1);
							setState(statetmp);
							setCurrent(current + 1);
							let arr = calculateMove(current + 1, statetmp, totalPage);
							if (arr) {
								setState(arr);
							}
							if (callback) callback(current + 1);
						} else {
							if (current !== totalPage) {
								setCurrent(current + 1);
								let arr = calculateMove(current + 1, state, totalPage);
								if (arr) {
									setState(arr);
								}
								if (callback) callback(current + 1);
							}
						}
					}}
				>
					<Icon icon="angle-right"></Icon>
				</Button>
			</li>
		</ul>
	);
}

Pagination.defaultProps = {
	pageSize: 10,
	defaultCurrent: 1,
	barMaxSize: 5
};

export default Pagination;
