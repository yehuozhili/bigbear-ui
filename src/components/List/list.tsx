import React, {
	FC,
	CSSProperties,
	MouseEvent,
	ReactNode,
	useRef,
	useEffect,
	DOMAttributes
} from "react";
import classNames from "classnames";

export interface ListProps extends DOMAttributes<HTMLUListElement> {
	/** 水平或者垂直 */
	mode?: "horizontal" | "vertical";
	/** 是否加上hover与active */
	withHoverActive?: boolean;
	/**ul的click回调 */
	onSelect?: (e: MouseEvent<HTMLUListElement, globalThis.MouseEvent>) => void;
	/**模板进行渲染 */
	renderTemplate?: (child: ReactNode, index: number) => ReactNode;
	/** ul样式 */
	style?: CSSProperties;
	/** li样式*/
	listyle?: CSSProperties;
	/** ul额外类名 */
	className?: string;
	/** li额外类名 */
	liClassName?: string;
	/**ref回调*/
	refCallback?: (e: HTMLUListElement | null) => void;
}

export const List: FC<ListProps> = (props) => {
	const {
		className,
		mode,
		style,
		children,
		onSelect,
		renderTemplate,
		listyle,
		liClassName,
		withHoverActive,
		refCallback,
		...restProps
	} = props;
	const classes = classNames("bigbear-list", className, {
		"list-vertical": mode === "vertical",
		"list-horizontal": mode === "horizontal"
	});
	const liclasses = classNames("bigbear-list-item", liClassName, {
		"list-withoveractive": withHoverActive
	});
	const handleClick = (e: React.MouseEvent<HTMLUListElement, globalThis.MouseEvent>) => {
		if (onSelect) onSelect(e);
	};
	const ulref = useRef<HTMLUListElement>(null);
	useEffect(() => {
		if (refCallback && ulref.current) {
			refCallback(ulref.current);
		}
	}, [refCallback]);
	return (
		<ul
			className={classes}
			style={style}
			onClick={(e) => handleClick(e)}
			ref={ulref}
			{...restProps}
		>
			{React.Children.map(children, (child, index) => {
				const res = renderTemplate ? (
					<li key={index} style={listyle} className={liclasses}>
						{renderTemplate(child, index)}
					</li>
				) : (
					<li key={index} className={liclasses} style={listyle}>
						{child}
					</li>
				);
				return res;
			})}
		</ul>
	);
};
List.defaultProps = {
	mode: "vertical",
	withHoverActive: false
};

export default List;
