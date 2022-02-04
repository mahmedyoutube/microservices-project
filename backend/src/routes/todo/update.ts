import express, { Request, Response } from "express";
import { body } from "express-validator";
import { NotFoundError } from "../../errors";
import { currentUser, requireAuth } from "../../middlewares";
import { Todo } from "../../models/todo";

const router = express.Router();

// currentUser,

router.patch(
  "/:id",
  [
    body("heading").notEmpty().withMessage("heading must be required"),
    body("description").notEmpty().withMessage("description must be required"),
  ],
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { heading, description } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new NotFoundError();
    }
    todo!.heading = heading;
    todo!.description = description;

    await todo.save();

    res.send(todo);
  }
);

export { router as updateTodoRouter };
