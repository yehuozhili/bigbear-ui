import React, { useState, useMemo, useEffect, ReactNode, CSSProperties } from "react";
import Icon from "../Icon";
import Pagination from "../Pagination";

export interface TableProps {
	/** 表内数据部分 */
	data: SourceDataType[];
	/** 表头部分*/
	columns: ColumnType[];
	/** 是否开启筛选 */
	sorted?: boolean;
	/** 是否开启页码 */
	pagination?: boolean;
	/** 开启页码时才有效，设置每页显示几个*/
	pageSize?: number;
	/** 外层容器类名*/
	className?: string;
	/** 外层容器样式*/
	style?: CSSProperties;
}

export interface SourceDataType {
	key: string;
	[key: string]: any;
}

export interface ColumnType {
	title: ReactNode;
	/** 排序等操作用来代替这列的 */
	dataIndex: string;
	sorter?: {
		compare: (a: SourceDataType, b: SourceDataType) => number;
	};
	render?: (v: any, value: SourceDataType, rowData: ColumnType) => ReactNode;
}

const MapData = (data: SourceDataType[], columnData: ColumnType[]) => {
	return data.map((v) => {
		return (
			<tr key={v.key} className="bigbear-table-data-row">
				{columnData.map((value, index) => {
					return (
						<td key={index} className="bigbear-table-data-item">
							<span>
								{value.render
									? value.render(v[value.dataIndex], v, value)
									: v[value.dataIndex]}
							</span>
						</td>
					);
				})}
			</tr>
		);
	});
};

function Table(props: TableProps) {
	const { data, columns, sorted, pagination, pageSize, className, style } = props;
	const [sourceData, setSourceData] = useState<SourceDataType[]>([]);
	const [columnData, setColumnData] = useState<ColumnType[]>([]);
	const [sortedData, setSortedData] = useState<SourceDataType[]>([]);
	const [filterState, setFilterState] = useState<boolean[]>([]);
	const [paginationData, setPaginationData] = useState<SourceDataType[][]>([]);
	const [current, setCurrent] = useState(0);
	const originPagination = useMemo(() => {
		return (data: SourceDataType[]) => {
			let tmp: SourceDataType[][] = [];
			let len = data.length;
			let pagenumber = Math.ceil(len / pageSize!);
			for (let i = 0; i < pagenumber; i++) {
				tmp[i] = data.slice(0 + i * pageSize!, pageSize! + i * pageSize!);
			}
			setPaginationData(tmp);
		};
	}, [pageSize]);
	const totalLen = useMemo(() => {
		setSourceData(data);
		if (pagination) {
			originPagination(data);
		}
		return data.length;
	}, [data, originPagination, pagination]);
	const totalColumn = useMemo(() => {
		setColumnData(columns);
		setFilterState(new Array(columns.length).fill(false));
		return columns.length;
	}, [columns]);
	const renderData = useMemo(() => {
		let render;
		if (pagination && paginationData.length !== 0) {
			render = MapData(paginationData[current], columnData);
		} else {
			if (sortedData.length === 0) {
				render = MapData(sourceData, columnData);
			} else {
				render = MapData(sortedData, columnData);
			}
		}
		return render;
	}, [columnData, current, pagination, paginationData, sortedData, sourceData]);
	useEffect(() => {
		if (sortedData.length !== 0) {
			originPagination(sortedData);
		}
	}, [originPagination, sortedData]);
	return (
		<div className={`bigbear-table-container ${className ? className : ""}`} style={style}>
			<div className="bigbear-table-wrapper">
				<table className="bigbear-table-table">
					<thead className="bigbear-table-head">
						<tr>
							{columnData.map((v, i) => {
								return (
									<th className="bigbear-table-title" key={i}>
										<span>{v.title}</span>

										{v.sorter && sorted && (
											<span
												className="bigbear-table-icon"
												onClick={() => {
													if (filterState[i]) {
														setSortedData([]);
														if (pagination) {
															originPagination(data);
														}
														filterState[i] = false;
														setFilterState([...filterState]);
													} else {
														let res = sourceData
															.slice()
															.sort(v.sorter?.compare);
														let newfilter = new Array(totalColumn).fill(
															false
														);
														newfilter[i] = true;
														setSortedData(res);
														setFilterState(newfilter);
													}
												}}
											>
												<Icon
													icon="filter"
													theme={
														filterState[i] === false
															? "dark"
															: "primary"
													}
												></Icon>
											</span>
										)}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody className="bigbear-table-data">{renderData}</tbody>
				</table>
			</div>
			{pagination && (
				<Pagination
					total={totalLen}
					pageSize={pageSize}
					callback={(v) => setCurrent(v - 1)}
				></Pagination>
			)}
		</div>
	);
}

Table.defaultProps = {
	sorted: false,
	pagination: false,
	pageSize: 10
};

export default Table;
