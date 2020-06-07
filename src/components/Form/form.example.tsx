import React from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import CheckBox from "../CheckBox";
import Button from "../Button";
import Form from "./form";

function FormExample() {
	const [handleSubmit, callbackObj, validate, blurObj] = useForm([
		{
			name: "input1",
			validate: [{ validate: (e) => e !== "", message: "用户名不能为空" }]
		},
		{
			name: "input2",
			validate: [
				{ validate: (e) => e !== "", message: "密码不为空" },
				{
					validate: (e) => e.length > 2 && e.length < 7,
					message: "密码必须大于2位或者小于7位"
				}
			]
		},
		{
			name: "checkbox",
			validate: [
				{
					validate: (e) => e.filter((v: boolean) => v).length === 3,
					message: "必须3个都选上"
				}
			]
		}
	]);
	const onSubmit = (data: any) => console.log(data);
	return (
		<Form>
			<Input
				prepend="用户名"
				callback={(e) => callbackObj.input1(e.target.value)}
				onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
					blurObj.input1(e.target.value);
				}}
			></Input>
			<div className="bigbear-form-validate">{validate.input1.map((v: string) => v)}</div>
			<Input
				prepend="密码"
				type="password"
				callback={(e) => callbackObj.input2(e.target.value)}
				onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
					blurObj.input2(e.target.value);
				}}
			></Input>
			<div className="bigbear-form-validate">
				{validate.input2.map((v: string, i: number) => (
					<div key={i}>{v}</div>
				))}
			</div>
			<CheckBox
				data={["check1", "check2", "check3"]}
				callback={(e) => callbackObj.checkbox(e)}
			></CheckBox>
			<div className="bigbear-form-validate">{validate.checkbox.map((v: string) => v)}</div>
			<br></br>
			<Button
				onClick={(e) => {
					e.preventDefault();
					handleSubmit(onSubmit);
				}}
			>
				提交
			</Button>
		</Form>
	);
}

export default FormExample;
