import express, { Request, Response } from "express";
import { body } from "express-validator";
import { NotFoundError } from "../errors";
import { currentUser, requireAuth } from "../middlewares";
import { Chat } from "../models/chat";

const router = express.Router();

// currentUser,

router.patch(
  "/:id",
  [body("message").notEmpty().withMessage("message must be required")],
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    // update Chat

    const { message } = req.body;

    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      throw new NotFoundError();
    }
    chat.message = message;
    await chat.save();

    res.send(chat);
  }
);

export { router as updateChatRouter };
