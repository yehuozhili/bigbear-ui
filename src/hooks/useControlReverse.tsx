import { useMemo } from "react";

function useControlReverse<T, F>(
	value: T,
	replaceValue: T | undefined,
	setState: F,
	replaceSetState: F | undefined
): [T, F] {
	const val = useMemo(() => {
		let val = value;
		if (replaceValue !== undefined) {
			val = replaceValue;
		}
		return val;
	}, [value, replaceValue]);
	const set = useMemo(() => {
		let set = setState;
		if (replaceSetState !== undefined) {
			set = replaceSetState;
		}
		return set;
	}, [setState, replaceSetState]);

	return [val, set];
}

export default useControlReverse;
