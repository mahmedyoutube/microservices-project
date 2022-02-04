import express, { Request, Response } from "express";
import { currentUser, requireAuth } from "../../middlewares";
import { Chat } from "../../models/chat";
import mongoose from "mongoose";
import { NotFoundError } from "../../errors";

const router = express.Router();

router.get(
  "/my-chats",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    // return all of my chat
    //res.send("hello world");
    const chats = await Chat.find({
      fromUserId: req.currentUser!.id,
    });
    res.send(chats);
  }
);

router.get(
  "/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    // return all of my chat
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      throw new NotFoundError();
    }
    res.send(chat);
  }
);

export { router as allChatRouter };
