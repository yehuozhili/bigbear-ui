import React, { useMemo, memo } from "react";
import Icon from "../Icon";
import { ProgressBar } from "./upload";
import Progress from "../Progress";
import Alert from "../Alert";
import Avatar from "../Avatar";
import { UpdateFilist } from "./upload";

interface UploadListProps {
	flist: ProgressBar[];
	onRemove: (item: ProgressBar) => void;
}

function UploadList(props: UploadListProps) {
	const { flist, onRemove } = props;
	return (
		<ul className="bigbear-upload-list">
			{flist.map((item) => {
				return (
					<li key={item.uid} className="bigbear-upload-li">
						<Alert
							className={`upload-${item.status}`}
							icon={<Icon icon="file-alt"></Icon>}
							title={item.filename}
							close={true}
							initiativeCloseCallback={() => onRemove(item)}
						></Alert>
						{(item.status === "upload" || item.status === "ready") && (
							<Progress count={item.percent}></Progress>
						)}
					</li>
				);
			})}
		</ul>
	);
}
const MemoUploadList = memo(UploadList);

export default MemoUploadList;

interface imageListProps extends UploadListProps {
	setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>;
}

export function ImageList(props: imageListProps) {
	const { flist, onRemove, setFlist } = props;
	useMemo(() => {
		if (flist) {
			flist.forEach((item) => {
				if (item.raw && !item.img) {
					const reader = new FileReader();
					reader.addEventListener("load", () => {
						UpdateFilist(setFlist, item, {
							img: reader.result || "error"
						});
					});
					reader.readAsDataURL(item.raw);
				}
			});
		}
	}, [flist, setFlist]);
	return (
		<div className="bigbear-upload-imagelist">
			{flist.map((item) => {
				return (
					<span
						key={item.uid}
						className="bigbear-upload-imageli"
						onClick={() => {
							onRemove(item);
						}}
					>
						<Avatar size="lg">
							{item.status === "success" && (
								<img
									src={typeof item.img === "string" ? item.img : ""}
									alt=""
								></img>
							)}
							{(item.status === "upload" || item.status === "ready") && (
								<span>
									<Icon icon="spinner" spin></Icon>
								</span>
							)}
							{item.status === "failed" && (
								<span>
									<Icon icon="image" theme="danger" />
								</span>
							)}
						</Avatar>
					</span>
				);
			})}
		</div>
	);
}
export const MemoImageList = memo(ImageList);
