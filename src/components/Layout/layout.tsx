import React, { PropsWithChildren, CSSProperties, DOMAttributes } from "react";
import classnames from "classnames";

export interface LayoutItemProps extends DOMAttributes<HTMLDivElement> {
	/** 样式*/
	style?: CSSProperties;
	/** 类名*/
	className?: string;
}

export interface LayoutProps extends LayoutItemProps {
	/** 子元素是否横向排列 */
	row?: boolean;
}

function Layout(props: PropsWithChildren<LayoutProps>) {
	const { style, className, row, children, ...restProps } = props;
	const classes = classnames("bigbear-layout", className, {
		"bigbear-layout-row": row
	});
	return (
		<section className={classes} style={style} {...restProps}>
			{children}
		</section>
	);
}

function Header(props: PropsWithChildren<LayoutItemProps>) {
	const { style, className, children, ...restProps } = props;
	const classes = classnames("bigbear-layout-header", className);
	return (
		<header className={classes} style={style} {...restProps}>
			{children}
		</header>
	);
}

function Content(props: PropsWithChildren<LayoutItemProps>) {
	const { style, className, children, ...restProps } = props;
	const classes = classnames("bigbear-layout-content", className);
	return (
		<main className={classes} style={style} {...restProps}>
			{children}
		</main>
	);
}

function Sider(props: PropsWithChildren<LayoutItemProps>) {
	const { style, className, children, ...restProps } = props;
	const classes = classnames("bigbear-layout-sider", className);
	return (
		<aside className={classes} style={style} {...restProps}>
			{children}
		</aside>
	);
}

function Footer(props: PropsWithChildren<LayoutItemProps>) {
	const { style, className, children, ...restProps } = props;
	const classes = classnames("bigbear-layout-footer", className);
	return (
		<footer className={classes} style={style} {...restProps}>
			{children}
		</footer>
	);
}

Layout.Header = Header;
Layout.Content = Content;
Layout.Sider = Sider;
Layout.Footer = Footer;

export default Layout;
