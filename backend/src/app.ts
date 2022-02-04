import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";
import {
  allTodoRouter,
  createTodoRouter,
  deleteTodoRouter,
  updateTodoRouter,
} from "./routes/todo";
import {
  allChatRouter,
  createChatRouter,
  deleteChatRouter,
  updateChatRouter,
} from "./routes/chat";
import { allUserRouter } from "./routes/all";

const app = express();
// app.set("trust proxy", true);
app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== 'test',
//   })
// );
app.use("/api/users", allUserRouter);
app.use("/api/users/currentUser", currentUserRouter);
app.use("/api/users/signin", signInRouter);
app.use("/api/users/signout", signOutRouter);
app.use("/api/users/signup", signUpRouter);

// related to todo feature
app.use("/api/todo", allTodoRouter);
app.use("/api/todo/create", createTodoRouter);
app.use("/api/todo/update", updateTodoRouter);
app.use("/api/todo/delete", deleteTodoRouter);

// related to chat feature
app.use("/api/chat", allChatRouter);
app.use("/api/chat/create", createChatRouter);
app.use("/api/chat/update", updateChatRouter);
app.use("/api/chat/delete", deleteChatRouter);

app.get("/", async (req, res) => {
  res.send({ message: "welcome" });
});

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
