import React from "react";
import AutoComplete, { DataSourceType } from "./autocomplete";

const data = [
	"yehuozhili",
	"bigbear",
	"nike",
	"hello kitty",
	"shop",
	"eat",
	"pikaqiu",
	"gobigger",
	"dell"
];
const myfilter = (query: string) => {
	return data.filter((name) => name.includes(query)).map((v) => ({ value: v }));
};

const AutocompleteExample = () => {
	return (
		<AutoComplete
			renderFilter={myfilter}
			prepend="autocomplete"
			selectCallback={(item) => console.log(item)}
			callback={(e) => console.log(e)}
		></AutoComplete>
	);
};
export default AutocompleteExample;

const ToUseTemplete = () => {
	return (
		<AutoComplete
			renderOption={(item) => <h1>{item.value}</h1>}
			renderFilter={myfilter}
		></AutoComplete>
	);
};
export { ToUseTemplete };

const asyncfilter: (query: string) => Promise<DataSourceType[]> = (query: string) => {
	return new Promise((res) => {
		setTimeout(() => {
			res(data.filter((name) => name.includes(query)).map((v) => ({ value: v })));
		}, 1000);
	});
};

export const AsyncTest = () => {
	return <AutoComplete renderFilter={asyncfilter}></AutoComplete>;
};
