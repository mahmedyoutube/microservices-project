import axios from "axios";
import configs from "../../configs";
import con from "../connection";
import { eventTypes } from "../eventTypes";

export const sendChatEvent = (body: {
  message: string;
  fromUserId: string;
  toUserId: string;
  todoId: string;
  chatId: string;
}) => {
  con.publish(
    JSON.stringify({
      fromService: configs.myServiceName,
      type: eventTypes.CREATED,
      ...body,
    })
  );
};

export const updateChatEvent = (body: { message: string; chatId: string }) => {
  con.publish(
    JSON.stringify({
      fromService: configs.myServiceName,
      type: eventTypes.UPDATED,
      ...body,
    })
  );
};

export const deleteChatEvent = (chatId: string) => {
  con.publish(
    JSON.stringify({
      fromService: configs.myServiceName,
      type: eventTypes.DELETED,
      chatId,
    })
  );
};
