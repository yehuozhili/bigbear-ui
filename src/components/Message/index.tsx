import Message, { message, MessageProps } from "./message";
import { FC } from "react";

type TransMessageType = FC<MessageProps> & {
	message: typeof message;
};
const TransMessage: TransMessageType = Message as TransMessageType;
TransMessage.message = message;

export default TransMessage;
