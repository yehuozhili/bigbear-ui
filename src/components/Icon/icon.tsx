import React, { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { faAd } from "@fortawesome/free-solid-svg-icons/faAd";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons/faAddressBook";
import { faAnchor } from "@fortawesome/free-solid-svg-icons/faAnchor";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import { faBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faAtom } from "@fortawesome/free-solid-svg-icons/faAtom";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

library.add(
	faCoffee,
	faInfoCircle,
	faSpinner,
	faAd,
	faAddressBook,
	faAnchor,
	faArrowLeft,
	faArrowDown,
	faArrowRight,
	faArrowUp,
	faQuestionCircle,
	faTimes,
	faUser,
	faSearch,
	faCog,
	faCircle,
	faAngleDown,
	faAngleLeft,
	faAngleRight,
	faAngleUp,
	faBell,
	faTimesCircle,
	faExclamationCircle,
	faBookmark,
	faCheckCircle,
	faMapMarkerAlt,
	faAtom,
	faFilter,
	faFileAlt,
	faImage,
	faLock,
	faEnvelope
);

export type ThemeProps =
	| "primary"
	| "secondary"
	| "success"
	| "info"
	| "warning"
	| "danger"
	| "light"
	| "dark"
	| "default";

export interface IconProps extends FontAwesomeIconProps {
	theme?: ThemeProps;
}

export const Icon: FC<IconProps> = (props) => {
	const { className, theme, ...restProps } = props;
	const classes = classNames("bigbear-icon", className, {
		[`icon-${theme}`]: theme
	});
	return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
