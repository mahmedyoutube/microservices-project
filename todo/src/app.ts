import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";
import {
  allTodoRouter,
  createTodoRouter,
  deleteTodoRouter,
  updateTodoRouter,
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

// related to todo feature
app.use("/", allTodoRouter);
app.use("/create", createTodoRouter);
app.use("/update", updateTodoRouter);
app.use("/delete", deleteTodoRouter);

app.get("/", async (req, res) => {
  res.send({ message: "welcome" });
});

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
