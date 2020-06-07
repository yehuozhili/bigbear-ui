import { FC } from "react";
import Menu, { MenuProps } from "./menu";
import SubMenu, { SubMenuProps } from "./submenu";
import MenuItem, { MenuItemProps } from "./menuitem";

export type IMenuComponent = FC<MenuProps> & {
	MenuItem: FC<MenuItemProps>;
	SubMenu: FC<SubMenuProps>;
};
const TransMenu = Menu as IMenuComponent;

TransMenu.MenuItem = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;

export { SubMenu, MenuItem };
