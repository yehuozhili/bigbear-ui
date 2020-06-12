import React, { useState } from "react";
import Button from "../Button";
import Progress from "./progress";

export function ProgressExample() {
	const [count, setCount] = useState(30);
	return (
		<div>
			<Button onClick={() => setCount(count + 1)}>+1</Button>
			<Button onClick={() => setCount(count - 1)}>-1</Button>
			<Button onClick={() => setCount(count + 10)}>+10</Button>
			<Button onClick={() => setCount(count - 10)}>-10</Button>
			<Progress count={count}></Progress>
		</div>
	);
}

export function Progresscircle() {
	const [count, setCount] = useState(1);
	return (
		<div>
			<Button onClick={() => setCount(count + 1)}>+1</Button>
			<Button onClick={() => setCount(count - 1)}>-1</Button>
			<Button onClick={() => setCount(count + 10)}>+10</Button>
			<Button onClick={() => setCount(count - 10)}>-10</Button>
			<Progress count={count} cicrle></Progress>
		</div>
	);
}
