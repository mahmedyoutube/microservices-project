import express, { Request, Response } from "express";
import { Chat } from "../../models/chat";
import mongoose from "mongoose";
import { User } from "../../models/user";
import { Todo } from "../../models/todo";
import { NotFoundError } from "../../errors";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { heading, description, userId, todoId } = req.body;

  console.log(
    " =========== todo created event received in chat service ============== ",
    req.body
  );

  // or you can pass token in a request and extract userId from it, ( best for security reason also )
  const todo = Todo.build({ heading, description, userId, todoId });

  await todo.save();
  res.send("done");
});

router.patch("/", async (req: Request, res: Response) => {
  const { heading, description, todoId } = req.body;

  console.log(
    " =========== todo updated event received in chat service ============== ",
    req.body
  );

  const todo = await Todo.findOne({ todoId });
  if (!todo) {
    throw new NotFoundError();
  }
  todo!.heading = heading;
  todo!.description = description;

  await todo!.save();

  res.send("done");
});

router.delete("/:id", async (req: Request, res: Response) => {
  console.log(
    " =========== todo deleted event received in chat service ============== ",
    req.body
  );

  await Todo.findOneAndDelete({ todoServiceId: req.params.id });
  res.send("done");
});

export { router as todoEvent };
