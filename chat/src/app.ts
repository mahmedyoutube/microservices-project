import express from "express";
import "express-async-errors";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";
import { json } from "body-parser";

import {
  allChatRouter,
  createChatRouter,
  deleteChatRouter,
  updateChatRouter,
} from "./routes";

const app = express();
// app.set("trust proxy", true);
app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== 'test',
//   })
// );

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
