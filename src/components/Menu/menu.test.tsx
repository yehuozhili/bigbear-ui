import React from "react";
import { render, fireEvent, RenderResult, cleanup, wait } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuitem";
import SubMenu from "./submenu";

const testProps: MenuProps = {
	defaultIndex: "0",
	onSelect: jest.fn(),
	className: "test"
};
const testVerProps: MenuProps = {
	defaultIndex: "0",
	mode: "vertical"
};
const testMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>active </MenuItem>
			<MenuItem disabled>disabled </MenuItem>
			<MenuItem>yehuozhili </MenuItem>
			<SubMenu title="dss">
				<MenuItem>s22</MenuItem>
			</SubMenu>
		</Menu>
	);
};

let wrapper: RenderResult,
	menuElement: HTMLElement,
	activeElement: HTMLElement,
	disabledElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
	beforeEach(() => {
		wrapper = render(testMenu(testProps));
		menuElement = wrapper.getByTestId("test-menu");
		activeElement = wrapper.getByText("active");
		disabledElement = wrapper.getByText("disabled");
	});
	it("should render correct Menu and MenuItem based on default props", () => {
		expect(menuElement).toBeInTheDocument();
		expect(menuElement).toHaveClass("bigbear-menu");
		expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
		expect(activeElement).toHaveClass("bigbear-menuitem isactive");
		expect(disabledElement).toHaveClass("bigbear-menuitem isdisabled");
	});
	it("click item should change active and call the right callback", () => {
		const thirdItem = wrapper.getByText("yehuozhili");
		fireEvent.click(thirdItem);
		expect(thirdItem).toHaveClass("isactive");
		expect(activeElement).not.toHaveClass("isactive");
		expect(testProps.onSelect).toHaveBeenCalledWith("2");
		fireEvent.click(disabledElement);
		expect(disabledElement).not.toHaveClass("isactive");
		expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
	});
	it("should render vertical menu ", () => {
		cleanup();
		const wrapper = render(testMenu(testVerProps));
		const menuElement = wrapper.getByTestId("test-menu");
		expect(menuElement).toHaveClass("menu-vertical");
	});
	it("should show dropdown item when hover on submenu", async () => {
		expect(wrapper.queryByText("s22")).toEqual(null);
		const dropdownEle = wrapper.getByText("dss");
		fireEvent.mouseEnter(dropdownEle);
		await (() => {
			expect(wrapper.queryByText("dss")?.parentElement).toHaveClass("bigbear-menuopen");
		});
		fireEvent.mouseLeave(dropdownEle);
		await wait(() => {
			expect(wrapper.queryByText("dss")?.parentElement).not.toHaveClass("bigbear-menuopen");
		});
	});
});
