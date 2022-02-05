import axios from "axios";

export const sendTodoEvent = (body: {
  heading: string;
  description: string;
  userId: string;
  todoId: string;
}) => {
  try {
    axios.post("http://chat:3001/events/todo", body); // todo service
  } catch (err) {
    console.log("event did not send. Please try again later ", err);
  }
  return;
};

export const updateTodoEvent = (body: {
  heading: string;
  description: string;
  todoId: string;
}) => {
  try {
    axios.patch("http://chat:3001/events/todo", body); // todo service
  } catch (err) {
    console.log("event did not send. Please try again later ", err);
  }
  return;
};

export const deleteTodoEvent = (todoId: string) => {
  try {
    axios.delete(`http://chat:3001/events/todo/${todoId}`); // todo service
  } catch (err) {
    console.log("event did not send. Please try again later ", err);
  }
  return;
};
