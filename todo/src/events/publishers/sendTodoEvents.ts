import axios from "axios";
import configs from "../../configs";
import con from "../connection";
import { eventTypes } from "../eventTypes";

export const sendTodoEvent = (body: {
  heading: string;
  description: string;
  userId: string;
  todoId: string;
}) => {
  con.publish(
    JSON.stringify({
      fromService: configs.myServiceName,
      type: eventTypes.CREATED,
      ...body,
    })
  );
};

export const updateTodoEvent = (body: {
  heading: string;
  description: string;
  todoId: string;
}) => {
  con.publish(
    JSON.stringify({
      fromService: configs.myServiceName,
      type: eventTypes.UPDATED,
      ...body,
    })
  );
};

export const deleteTodoEvent = (todoId: string) => {
  con.publish(
    JSON.stringify({
      fromService: configs.myServiceName,
      type: eventTypes.DELETED,
      todoId,
    })
  );
};
