import React, { PropsWithChildren, useState, useMemo } from "react";

export interface I18nDataSource {
	[key: string]: string;
}

export interface I18nCombinedSource {
	[key: string]: I18nDataSource;
}

export interface contextType {
	state: I18nDataSource;
	toggle: (str: string) => void;
}

export let Context = React.createContext<contextType>({ state: {}, toggle: () => {} });

export interface I18nProps {
	/** 默认语言*/
	defaultLang: keyof I18nDataSource;
	/** 语言库 */
	library: I18nCombinedSource;
}

function I18n(props: PropsWithChildren<I18nProps>) {
	const { defaultLang, library, children } = props;
	const [state, setState] = useState<I18nDataSource>(library[defaultLang] || {});
	let toggle = useMemo(() => {
		return function(str: keyof I18nDataSource) {
			if (library[str]) {
				setState(library[str]);
			}
		};
	}, [library]);
	return <Context.Provider value={{ state, toggle }}>{children}</Context.Provider>;
}

export default I18n;
