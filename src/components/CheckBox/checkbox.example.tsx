import React, { useState } from "react";
import CheckBox from "./checkbox";

export function CheckBoxExample() {
	const data = ["check1", "check2", "check3"];
	const [state, setState] = useState<boolean[]>([]);
	return (
		<div>
			<CheckBox
				data={["全选"]}
				callback={(e) => {
					e[0]
						? setState(new Array(data.length).fill(true))
						: setState(new Array(data.length).fill(false));
				}}
			></CheckBox>
			<br></br>
			<CheckBox
				data={data}
				parentSetStateCallback={(e, i) => {
					e[i] = !e[i];
					setState([...e]);
				}}
				parentState={state}
			></CheckBox>
		</div>
	);
}
