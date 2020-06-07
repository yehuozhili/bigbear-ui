import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const defaultProps = {
	onClick: jest.fn()
};

const testProps: ButtonProps = {
	btnType: "primary",
	size: "lg",
	className: "testprops"
};

const disabledProps: ButtonProps = {
	disabled: true,
	onClick: jest.fn()
};

describe("test Button component", () => {
	it("should render the correct default button", () => {
		const wrapper = render(<Button {...defaultProps}>hello</Button>);
		const ele = wrapper.getByText("hello") as HTMLButtonElement;
		expect(ele).toBeInTheDocument();
		expect(ele.tagName).toEqual("BUTTON");
		expect(ele).toHaveClass("btn btn-type-default");
		expect(ele.disabled).toBeFalsy();
		fireEvent.click(ele);
		expect(defaultProps.onClick).toHaveBeenCalled();
	});
	it("should render the correct component based on different props ", () => {
		const wrapper = render(<Button {...testProps}>hello</Button>);
		const ele = wrapper.getByText("hello");
		expect(ele).toBeInTheDocument();
		expect(ele).toHaveClass("btn-type-primary testprops");
	});
	it("should render a link when btnType equal link", () => {
		const wrapper = render(<Button btnType="link">linkbutton</Button>);
		const ele = wrapper.getByText("linkbutton");
		expect(ele).toBeInTheDocument();
		expect(ele.tagName).toEqual("A");
		expect(ele).toHaveClass("btn btn-type-link");
	});
	it("should render disabled when disabled set", () => {
		const wrapper = render(<Button {...disabledProps}>hello</Button>);
		const ele = wrapper.getByText("hello") as HTMLButtonElement;
		expect(ele).toBeInTheDocument();
		expect(ele.disabled).toBeTruthy();
		fireEvent.click(ele);
		expect(disabledProps.onClick).not.toHaveBeenCalled();
	});
});
