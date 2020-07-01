import React, { useContext } from "react";
import I18n, { Context } from "./i18n";
import Button from "../Button";
import Badge from "../Badge";

const zh = {
	language: "语言",
	apple: "苹果"
};
const en = {
	language: "english language",
	apple: "english apple"
};
const combinedLibrary = {
	zh,
	en
};
export default function I18nExampleApp() {
	return (
		<I18n defaultLang={"zh"} library={combinedLibrary}>
			<Child></Child>
		</I18n>
	);
}
function Child() {
	let { state, toggle } = useContext(Context);
	return (
		<div>
			<Badge count={state.language}></Badge>
			<Badge count={state.apple}></Badge>
			<div>
				<Button
					onClick={() => {
						toggle("zh");
					}}
				>
					切换中文
				</Button>
			</div>
			<Button
				onClick={() => {
					toggle("en");
				}}
			>
				切换英文
			</Button>
		</div>
	);
}
