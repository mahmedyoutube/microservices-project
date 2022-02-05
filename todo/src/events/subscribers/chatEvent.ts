import express, { Request, Response } from "express";
import { Chat } from "../../models/chat";
import mongoose from "mongoose";
import { User } from "../../models/user";
import { Todo } from "../../models/todo";
import { NotFoundError } from "../../errors";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { message, fromUserId, toUserId, todoId, chatId } = req.body;

  console.log(
    " =========== chat event received in todo service ============== ",
    req.body
  );

  // or you can pass token in a request and extract userId from it, ( best for security reason also )
  const chat = Chat.build({ message, fromUserId, toUserId, todoId, chatId });
  await chat.save();
  res.send("done");
});

router.patch("/", async (req: Request, res: Response) => {
  const { message, chatId } = req.body;

  console.log(
    " =========== chat updated event received in todo service ============== ",
    req.body
  );

  const chat = await Chat.findOne({ chatId });
  if (!chat) {
    throw new NotFoundError();
  }
  chat!.message = message;

  await chat!.save();

  res.send("done");
});

router.delete("/:id", async (req: Request, res: Response) => {
  console.log(
    " =========== chat deleted event received in todo service ============== ",
    req.body
  );

  await Chat.findOneAndDelete({ chatId: req.params.id });
  res.send("done");
});

export { router as chatEvent };
