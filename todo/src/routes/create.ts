import express, { Request, Response } from "express";
import { currentUser, requireAuth } from "../middlewares";
import { body } from "express-validator";
import { Todo } from "../models/todo";

const router = express.Router();

// currentUser,

router.post(
  "/",
  [
    body("heading").notEmpty().withMessage("heading must be required"),
    body("description").notEmpty().withMessage("description must be required"),
  ],
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { heading, description } = req.body;

    const todo = Todo.build({
      heading,
      description,
      userId: req.currentUser!.id,
    });

    await todo.save();

    res.send(todo);
  }
);

export { router as createTodoRouter };
