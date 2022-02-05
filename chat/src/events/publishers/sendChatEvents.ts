import axios from "axios";

export const sendChatEvent = (body: {
  message: string;
  fromUserId: string;
  toUserId: string;
  todoId: string;
  chatId: string;
}) => {
  try {
    axios.post("http://todo:3002/events/chat", body); // todo service
  } catch (err) {
    console.log("event did not send. Please try again later ", err);
  }
  return;
};

export const updateChatEvent = (body: { message: string; chatId: string }) => {
  try {
    axios.patch("http://todo:3002/events/chat", body); // todo service
  } catch (err) {
    console.log("event did not send. Please try again later ", err);
  }
  return;
};

export const deleteChatEvent = (chatId: string) => {
  try {
    axios.delete(`http://todo:3002/events/chat/${chatId}`); // todo service
  } catch (err) {
    console.log("event did not send. Please try again later ", err);
  }
  return;
};
