import { Express } from "express";
import { authEvent } from "./subscribers/authEvent";
import { todoEvent } from "./subscribers/todoEvent";

export * from "./publishers";

export const registerEvents = (app: Express) => {
  app.use("/events/user", authEvent);
  app.use("/events/todo", todoEvent);
};
