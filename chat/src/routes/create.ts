import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { sendChatEvent } from "../events";
import { currentUser, requireAuth } from "../middlewares";
import { Chat } from "../models/chat";

const router = express.Router();

// currentUser,

router.post(
  "/",
  [
    body("message").notEmpty().withMessage("message must be required"),
    body("todoId").notEmpty().withMessage("todoId must be required"),
    body("toUserId").notEmpty().withMessage("toUserId must be required"),
  ],
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    // create chat

    const { message, todoId, toUserId } = req.body;
    const chat = Chat.build({
      message,
      todoId,
      fromUserId: req.currentUser!.id,
      toUserId,
    });
    await chat.save();

    sendChatEvent({
      message,
      todoId,
      fromUserId: req.currentUser!.id,
      toUserId,
      chatId: chat.id,
    });

    res.send(chat);
  }
);

export { router as createChatRouter };
