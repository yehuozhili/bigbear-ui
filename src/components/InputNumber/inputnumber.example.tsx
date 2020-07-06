import React, { useState } from "react";
import InputNumber from "./inputnumber";

export default function() {
	const [state, setState] = useState<string>("0");
	return (
		<InputNumber
			parentValue={state}
			parentSetState={setState}
			inputNumberCallback={(e) => console.log(e)}
		></InputNumber>
	);
}
