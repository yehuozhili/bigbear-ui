import React, { useState } from "react";
import Popconfirm from "./popconfirm";
import Button from "../Button";

export function PopconfirmExample() {
	const [state, setState] = useState(false);
	return (
		<div>
			<Popconfirm
				wrapperNode={<Button onClick={() => setState(!state)}>父组件控制状态</Button>}
				title="balabalabalabala"
				visible={state}
				setState={setState}
			></Popconfirm>
		</div>
	);
}
