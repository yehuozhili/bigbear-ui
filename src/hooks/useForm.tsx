import { useMemo, useState } from "react";

interface ValidateType {
	validate: (e: any) => boolean;
	message: string;
}

interface UseFormProps {
	name: string;
	validate?: Array<ValidateType>;
}

interface UserData {
	[key: string]: any;
}
interface BlurDataType {
	[key: string]: boolean;
}
interface FnObjType {
	[key: string]: (e: any) => void;
}
interface ValidataType {
	[key: string]: string[];
}

type UseFormType = [(fn: any) => void, FnObjType, ValidataType, FnObjType];

function useForm(args: UseFormProps[]): UseFormType {
	const [state, setState] = useState<UserData>();
	const [validata, setValidata] = useState<ValidataType>(() =>
		args.reduce((p, n) => {
			p[n.name] = [];
			return p;
		}, {} as ValidataType)
	);
	const [blurData, setBlurData] = useState<BlurDataType>({});
	const returnObj = useMemo(() => {
		let obj: FnObjType = {};
		let blurobj: FnObjType = {};
		args.forEach((o) => {
			obj[o.name] = (e: any) => {
				if (o.validate) {
					let resArr: string[] = [];
					o.validate.forEach((v) => {
						let sign = v.validate(e);
						if (!sign) {
							//true验证过
							resArr.push(v.message);
						}
					});
					setValidata({ ...validata, ...{ [o.name]: resArr } });
				}
				setState({ ...state, ...{ [o.name]: e } });
			};
			blurobj[o.name] = (e: any) => {
				if (blurData && blurData[o.name]) {
				} else {
					setBlurData({ ...blurData, ...{ [o.name]: true } });
					if (o.validate) {
						let resArr: string[] = [];
						o.validate.forEach((v) => {
							let sign = v.validate(e);
							if (!sign) {
								//true验证过
								resArr.push(v.message);
							}
						});
						setValidata({ ...validata, ...{ [o.name]: resArr } });
					}
				}
			};
		});
		return [obj, blurobj];
	}, [args, blurData, state, validata]);
	const handleSubmit = (fn: any) => {
		fn(state);
	};
	return [handleSubmit, returnObj[0], validata, returnObj[1]];
}

export default useForm;
