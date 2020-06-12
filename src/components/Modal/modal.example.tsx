import Modal from "./modal";
import { useState } from "react";
import React from "react";
import Button from "../Button";
import Icon from "../Icon";

export function ModalExample() {
	const [state, setState] = useState(false);
	return (
		<div>
			<Modal setState={setState} visible={state} callback={(v) => console.log(v)}>
				<p>balabalabala</p>
				<p>balabalabalalalalallaa</p>
			</Modal>
			<Button onClick={() => setState(!state)}>基本使用</Button>
		</div>
	);
}
export function ModalExample2() {
	const [state, setState] = useState(false);
	return (
		<div>
			<Modal
				setState={setState}
				visible={state}
				maskClose={false}
				callback={(v) => console.log(v)}
			>
				<p>balabalabala</p>
				<p>balabalabalalalalallaa</p>
			</Modal>
			<Button onClick={() => setState(!state)}>点击mask不关闭</Button>
		</div>
	);
}

export function ModalExample3() {
	const [state, setState] = useState(false);
	return (
		<div>
			<Modal setState={setState} visible={state} okText="ok" cancelText="cancel">
				<p>balabalabala</p>
				<p>balabalabalalalalallaa</p>
			</Modal>
			<Button onClick={() => setState(!state)}>改变confirm按钮文本</Button>
		</div>
	);
}

export function ModalExample4() {
	const [state, setState] = useState(false);
	return (
		<div>
			<Modal setState={setState} visible={state} confirm={false}>
				<p>balabalabala</p>
				<p>balabalabalalalalallaa</p>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<Button btnType="primary" onClick={() => setState(false)}>
						自定义ok
					</Button>
					<Button btnType="info" onClick={() => setState(false)}>
						自定义取消
					</Button>
				</div>
			</Modal>
			<Button onClick={() => setState(!state)}>自定义按钮</Button>
		</div>
	);
}

export function ModalExample5() {
	const [state, setState] = useState(false);
	return (
		<div>
			<Modal
				title={
					<p>
						<Icon icon={"info-circle"}></Icon>带上图标标题
					</p>
				}
				setState={setState}
				visible={state}
				style={{ top: "40px", width: "800px" }}
				closeButton={false}
			>
				<p>balabalabala</p>
				<p>balabalabalalalalallaa</p>
			</Modal>
			<Button onClick={() => setState(!state)}>自定义大小</Button>
		</div>
	);
}
