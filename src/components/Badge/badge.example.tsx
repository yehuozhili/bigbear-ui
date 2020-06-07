import React, { useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Badge from "./badge";

export function BadgeExample() {
	const [numberObj, setNumber] = useState({
		trueNumber: 0,
		displayNumber: "0"
	});
	const [visible, setVisible] = useState(false);
	const addValidate = (number: number) => {
		if (!visible) setVisible(true);
		if (number + 1 > 99) {
			setNumber({
				trueNumber: numberObj.trueNumber + 1,
				displayNumber: "99+"
			});
		} else {
			setNumber({
				trueNumber: numberObj.trueNumber + 1,
				displayNumber: numberObj.trueNumber + 1 + ""
			});
		}
	};
	const minusValidate = (number: number) => {
		if (number - 1 <= 0) {
			setVisible(false);
			setNumber({ trueNumber: 0, displayNumber: "0" });
		} else if (number > 0 && number - 1 <= 99) {
			setNumber({
				trueNumber: numberObj.trueNumber - 1,
				displayNumber: numberObj.trueNumber - 1 + ""
			});
		} else {
			setNumber({
				trueNumber: numberObj.trueNumber - 1,
				displayNumber: "99+"
			});
		}
	};
	return (
		<div>
			<Badge count={numberObj.displayNumber} visible={visible} type="danger">
				<Button size="lg">
					<Icon icon="user" theme="dark" />
				</Button>
			</Badge>
			<hr></hr>
			<div>点击按钮控制角标数字增减，99以上会变成99+：</div>
			<Button onClick={() => addValidate(numberObj.trueNumber)}>数字加一</Button>
			&nbsp;
			<Button onClick={() => minusValidate(numberObj.trueNumber)}>数字减一</Button>
		</div>
	);
}
