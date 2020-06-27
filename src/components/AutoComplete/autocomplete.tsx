import React, { FC, useState, ReactElement, useEffect, KeyboardEvent, useRef } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

interface DataSourceObject {
	value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteType extends Omit<InputProps, "callback"> {
	/**筛选函数  */
	renderFilter: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
	/**下拉菜单选择后的回调 */
	selectCallback?: (item: DataSourceType) => void;
	/**使用传入函数进行渲染 */
	renderOption?: (item: DataSourceType) => ReactElement;
	/** 初始值 */
	value?: string;
	/**防抖延迟参数 */
	delay?: number;
	/** input的值*/
	callback?: (v: string) => void;
}

const renderTemplate = (
	item: DataSourceType,
	renderOption: ((item: DataSourceType) => ReactElement) | undefined
) => {
	return renderOption ? renderOption(item) : item.value;
};

const generateDropDown = (
	dropdown: DataSourceType[],
	selectCallback: ((item: DataSourceType) => void) | undefined,
	setDropDown: React.Dispatch<React.SetStateAction<DataSourceObject[]>>,
	setState: React.Dispatch<React.SetStateAction<string>>,
	renderOption: ((item: DataSourceType) => ReactElement) | undefined,
	highlightIndex: number,
	triggerSearch: React.MutableRefObject<boolean>,
	callback: ((v: string) => void) | undefined
) => {
	return (
		<ul className="bigbear-autocomplete-ul">
			{dropdown.map((item: DataSourceType, index: number) => {
				const cnames = classNames("bigbear-autocomplete-item", {
					"autocomplete-item-highlight": index === highlightIndex
				});
				return (
					<li
						key={index}
						className={cnames}
						onClick={() => {
							triggerSearch.current = false;
							setState(item.value);
							if (callback) callback(item.value);
							setDropDown([]);
							selectCallback && selectCallback(item);
						}}
					>
						{renderTemplate(item, renderOption)}
					</li>
				);
			})}
		</ul>
	);
};

export const AutoComplete: FC<AutoCompleteType> = (props) => {
	const {
		renderFilter,
		selectCallback,
		value,
		renderOption,
		delay,
		callback,
		...restProps
	} = props;
	const [dropdown, setDropDown] = useState<DataSourceType[]>([]);
	const [state, setState] = useState(value!);
	const [loading, setLoading] = useState(false);
	const [highlightIndex, setHighlightIndex] = useState(-1);
	const debouncedValue = useDebounce(state, delay);
	const triggerSearch = useRef(true);
	const autoRef = useRef(null);
	useClickOutside(autoRef, () => setDropDown([]));
	useEffect(() => {
		if (debouncedValue && triggerSearch.current) {
			const res = renderFilter(debouncedValue);
			if (res instanceof Promise) {
				setLoading(true);
				res.then((v) => {
					setDropDown(v);
					setLoading(false);
				});
			} else {
				setDropDown(res);
				if (res.length > 0) setHighlightIndex(0);
			}
		} else {
			setDropDown([]);
		}
	}, [renderFilter, debouncedValue]);

	const hightlight = (index: number) => {
		if (index < 0) index = 0;
		if (index >= dropdown.length) {
			index = dropdown.length - 1;
		}
		setHighlightIndex(index);
	};
	const handlekeyDown = (e: KeyboardEvent<HTMLElement>) => {
		switch (e.keyCode) {
			case 13:
				if (dropdown[highlightIndex]) {
					setState(dropdown[highlightIndex].value);
					setDropDown([]);
					triggerSearch.current = false;
				}
				break;
			case 38:
				hightlight(highlightIndex - 1);
				break;
			case 40:
				hightlight(highlightIndex + 1);
				break;
			case 27:
				setDropDown([]);
				break;
			default:
				break;
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		triggerSearch.current = true;
		if (callback) callback(state);
	};
	return (
		<div className="bigbear-autocomplete" ref={autoRef}>
			<Input
				value={state!}
				{...restProps}
				setValueCallback={setState}
				onKeyDown={handlekeyDown}
				callback={handleChange}
			></Input>
			{loading && (
				<ul className="bigbear-autocomplete-spin">
					<Icon icon="spinner" spin></Icon>
				</ul>
			)}
			{dropdown.length > 0 &&
				generateDropDown(
					dropdown,
					selectCallback,
					setDropDown,
					setState,
					renderOption,
					highlightIndex,
					triggerSearch,
					callback
				)}
		</div>
	);
};

AutoComplete.defaultProps = {
	delay: 500,
	value: ""
};

export default AutoComplete;
