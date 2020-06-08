import React from "react";
import { SourceDataType } from "./table";
import Button from "../Button";

export const columns = [
	{
		title: "Name",
		dataIndex: "name"
	},
	{
		title: "Chinese Score",
		dataIndex: "chinese",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.chinese - a.chinese
		}
	},
	{
		title: "Math Score",
		dataIndex: "math",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.math - a.math
		}
	},
	{
		title: "English Score",
		dataIndex: "english",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.english - a.english
		}
	}
];

export const data = [
	{
		key: "1",
		name: "John Brown",
		chinese: 55,
		math: 60,
		english: 70
	},
	{
		key: "2",
		name: "Jim Green",
		chinese: 98,
		math: 66,
		english: 89
	},
	{
		key: "3",
		name: "Joe Black",
		chinese: 78,
		math: 90,
		english: 70
	},
	{
		key: "4",
		name: "Jim Red",
		chinese: 88,
		math: 99,
		english: 89
	}
];

export const longcolumns = [
	{
		title: "Name",
		dataIndex: "name",
		width: 150
	},
	{
		title: "Age",
		dataIndex: "age",
		width: 150
	},
	{
		title: "Address",
		dataIndex: "address"
	}
];

const longdata = [];
for (let i = 0; i < 101; i++) {
	longdata.push({
		key: i,
		name: `Edward King ${i}`,
		age: 32,
		address: `London, Park Lane no. ${i}`
	});
}
export { longdata };

const longlongdata = [];
for (let i = 0; i < 101; i++) {
	longlongdata.push({
		key: i,
		name: `Edward King ${i}`,
		chinese: 1 + i,
		math: Math.floor(Math.random() * 100),
		english: 100 - i
	});
}

export { longlongdata };

export const columnsRender = [
	{
		title: "Name",
		dataIndex: "name"
	},
	{
		title: "Chinese Score",
		dataIndex: "chinese",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.chinese - a.chinese
		},
		render: (data: number) => <a href="/">{data}</a>
	},
	{
		title: "Math Score",
		dataIndex: "math",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.math - a.math
		},
		render: (data: number) => <h5>{data}</h5>
	},
	{
		title: "English Score",
		dataIndex: "english",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.english - a.english
		},
		render: (data: number) => <Button>{data}</Button>
	}
];
