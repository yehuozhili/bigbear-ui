import React, { ChangeEvent, useState, ReactNode, useRef, useCallback } from "react";
import Button from "../Button";
import axios, { CancelTokenSource } from "axios";
import UploadList, { MemoImageList } from "./uploadlist";
import { BaseButtonProps } from "../Button/button";
import Badge from "../Badge";

interface UploadProps {
	/** 类型，默认模式不进行回显和显示进度，img模式进行回显图片,progress显示进度*/
	type?: "default" | "img" | "progress";
	/** 是否选择文件后按提交按钮才上传 */
	confirm?: boolean;
	/** 验证逻辑 返回false则不通过*/
	validate?: (e: ChangeEvent<HTMLInputElement>) => boolean;
	/** 选择文件上传按钮的属性 */
	uploadBtnAtr?: BaseButtonProps;
	/** 选择文件上传按钮的文字 */
	uploadBtn?: ReactNode;
	/**上传多少张按钮消失，只在type为img或者progress有效 */
	uploadNumber?: number;
	/** 提交按钮,只在confirm为true有效 */
	submitBtn?: ReactNode;
	/** 自定义提交,不使用内部发送请求进行上传，可自定义上传头*/
	customSubmit?: (file: FileList | null) => void;
	/** 使用内部上传所提供的url */
	url?: string;
	/** 成功的回调 只在使用内部发送有效，下同*/
	successCallback?: (res: any) => void;
	/** 失败的回调 */
	failCallback?: (res: any) => void;
	/** 获取上传进度 */
	onProgress?: (percentage: number, file: File, i: number) => void;
	/** 是否多个文件同时上传*/
	multiple?: boolean;
	/** 上传给服务器的文件名 */
	filename?: (f: File, i: number) => string;
	/** 如果返回promise，需要提供file，否则同步需要返回boolean，如果为false，则不发送*/
	beforeUpload?: (f: File, i: number) => boolean | Promise<File>;
	/** 默认展示的文件及进度，只有type为progress有效 */
	defaultProgressBar?: ProgressBar[];
	/** 删除文件列表时的回调，只有type为progress或者img有效  */
	onRemoveCallback?: (f: ProgressBar) => void;
	/** 自定义删除行为，只有type为progress或者img有效*/
	customRemove?: (
		file: ProgressBar,
		setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>
	) => void;
	/** 携带cookie?*/
	withCredentials?: boolean;
	/** 设置请求头*/
	headers?: { [key: string]: any };
	/** input的accept属性*/
	accept?: string;
	/** 自定义展示用户的选择，只在confirm为true有效*/
	customShowChoose?: (item: File) => ReactNode;
}

export interface ProgressBar {
	filename: string;
	percent: number;
	status: "ready" | "success" | "failed" | "upload";
	uid: string;
	size: number;
	raw: File | null;
	cancel?: CancelTokenSource;
	img?: string | ArrayBuffer | null;
}

export const UpdateFilist = (
	setFile: React.Dispatch<React.SetStateAction<ProgressBar[]>>,
	_file: ProgressBar,
	uploadPartial: Partial<ProgressBar>
) => {
	setFile((prevList) => {
		if (prevList) {
			return prevList.map((v) => {
				if (v.uid === _file.uid) {
					return { ...v, ...uploadPartial };
				} else {
					return v;
				}
			});
		} else {
			return prevList;
		}
	});
};

const PostFile = (
	url: string,
	formData: FormData,
	onProgress: ((percentage: number, file: File, i: number) => void) | undefined,
	f: File,
	i: number,
	successCallback: ((res: any) => void) | undefined,
	failCallback: ((res: any) => void) | undefined,
	setFile: React.Dispatch<React.SetStateAction<ProgressBar[]>>,
	headers: { [key: string]: any } | undefined,
	withCredentials: boolean | undefined
) => {
	const source = axios.CancelToken.source();
	const _file: ProgressBar = {
		filename: f.name,
		percent: 0,
		status: "ready",
		uid: Date.now() + "upload",
		size: f.size,
		raw: f,
		cancel: source
	};
	setFile((prev) => {
		return [_file, ...prev];
	});
	axios
		.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				...headers
			},
			withCredentials,
			cancelToken: source.token,
			onUploadProgress: (e) => {
				let percentage = Math.round((e.loaded * 100) / e.total) || 0;
				UpdateFilist(setFile, _file, { status: "upload", percent: percentage });
				if (onProgress) {
					onProgress(percentage, f, i);
				}
			}
		})
		.then((res) => {
			UpdateFilist(setFile, _file, { status: "success", percent: 100 });
			if (successCallback) {
				successCallback(res);
			}
		})
		.catch((r) => {
			UpdateFilist(setFile, _file, { status: "failed", percent: 0 });
			if (failCallback) {
				failCallback(r);
			}
		});
};

function Upload(props: UploadProps) {
	const {
		validate,
		submitBtn,
		customSubmit,
		url,
		successCallback,
		failCallback,
		multiple,
		onProgress,
		filename,
		beforeUpload,
		type,
		defaultProgressBar,
		confirm,
		uploadBtnAtr,
		uploadBtn,
		onRemoveCallback,
		headers,
		withCredentials,
		accept,
		customShowChoose,
		customRemove,
		uploadNumber
	} = props;
	const [file, setFile] = useState<FileList | null>(null);
	const [flist, setFlist] = useState<ProgressBar[]>(defaultProgressBar || []);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target && e.target.files && e.target.files.length > 0) {
			if (validate) {
				if (validate(e)) {
					setFile(e.target.files);
					if (!confirm) handleSubmit(e.target.files);
				} else {
					setFile(null);
				}
			} else {
				setFile(e.target.files);
				if (!confirm) handleSubmit(e.target.files);
			}
		} else {
			setFile(null);
		}
	};
	const handleSubmit = useCallback(
		(files: FileList | null) => {
			if (inputRef.current) {
				inputRef.current.setAttribute("value", "");
			}
			let resFiles;
			files ? (resFiles = files) : (resFiles = file);
			if (customSubmit) {
				customSubmit(resFiles);
			} else {
				if (resFiles) {
					let postFile = Array.from(resFiles);
					postFile.forEach((f: File, i) => {
						const formData = new FormData();
						const fname = filename ? filename(f, i) : f.name;
						formData.append(fname, f);
						if (beforeUpload) {
							const res = beforeUpload(f, i);
							if (res && res instanceof Promise) {
								res.then((fi) => {
									PostFile(
										url!,
										formData,
										onProgress,
										fi,
										i,
										successCallback,
										failCallback,
										setFlist,
										headers,
										withCredentials
									);
								});
							} else {
								if (res) {
									PostFile(
										url!,
										formData,
										onProgress,
										f,
										i,
										successCallback,
										failCallback,
										setFlist,
										headers,
										withCredentials
									);
								}
							}
						} else {
							PostFile(
								url!,
								formData,
								onProgress,
								f,
								i,
								successCallback,
								failCallback,
								setFlist,
								headers,
								withCredentials
							);
						}
					});
				}
			}
		},
		[
			beforeUpload,
			customSubmit,
			failCallback,
			file,
			filename,
			headers,
			onProgress,
			successCallback,
			url,
			withCredentials
		]
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const buttonclick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};
	const handleRemove = useCallback(
		(file: ProgressBar) => {
			if (customRemove) {
				customRemove(file, setFlist);
			} else {
				setFlist((prev) => {
					return prev.filter((item) => {
						if (item.uid === file.uid && item.status === "upload" && item.cancel) {
							item.cancel.cancel();
						}
						return item.uid !== file.uid;
					});
				});
			}

			if (onRemoveCallback) {
				onRemoveCallback(file);
			}
		},
		[customRemove, onRemoveCallback]
	);
	return (
		<div className="bigbear-upload-wrapper">
			{!(uploadNumber !== 0 && uploadNumber! <= flist.length) && (
				<div className="bigbear-upload-input">
					<input
						ref={inputRef}
						style={{ display: "none" }}
						type="file"
						onChange={handleChange}
						multiple={multiple}
						accept={accept}
					></input>
					<Button onClick={buttonclick} {...uploadBtnAtr}>
						{uploadBtn}
					</Button>
				</div>
			)}
			{confirm && !(uploadNumber !== 0 && uploadNumber! <= flist.length) && (
				<div className="bigbear-upload-btn">
					<div className="bigbear-upload-showchoose">
						{file &&
							Array.from(file).map((item, index) => {
								if (customShowChoose) {
									return customShowChoose(item);
								} else {
									return (
										<Badge
											key={index + item.lastModified}
											count={item.name}
											type={"info"}
										></Badge>
									);
								}
							})}
					</div>
					<div className="bigbear-upload-btn" onClick={() => handleSubmit(null)}>
						{submitBtn ? submitBtn : <Button>{"submit"}</Button>}
					</div>
				</div>
			)}
			{type === "img" && (
				<MemoImageList
					setFlist={setFlist}
					flist={flist}
					onRemove={handleRemove}
				></MemoImageList>
			)}
			{type === "progress" && <UploadList onRemove={handleRemove} flist={flist}></UploadList>}
		</div>
	);
}

Upload.defaultProps = {
	url: "http://localhost:6699/user/uploadAvatar",
	confirm: false,
	type: "default",
	uploadBtn: "Upload",
	uploadNumber: 0
};

export default Upload;
