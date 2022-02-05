import { Express } from "express";
import { authEvent } from "./subscribers/authEvent";
import { chatEvent } from "./subscribers/chatEvent";

export * from "./publishers"

export const registerEvents = (app: Express) => {
  app.use("/events/user", authEvent);
  app.use("/events/chat", chatEvent);
};


