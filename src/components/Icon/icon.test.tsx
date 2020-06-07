import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Icon, { ThemeProps } from "./icon";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const testIcon = (icon: IconProp, theme: ThemeProps, size?: FontAwesomeIconProps["size"]) => {
	return <Icon icon={icon} theme={theme} size={size}></Icon>;
};

describe("test Icon component", () => {
	let wrapper: RenderResult;
	beforeEach(() => {
		wrapper = render(testIcon("coffee", "success", "5x"));
	});
	it("should render icon ", () => {
		let svg = wrapper.container.querySelector("svg");
		expect(svg).toBeTruthy();
	});
});
