import express, { Request, Response } from "express";
import { currentUser, requireAuth } from "../../middlewares";
import { Todo } from "../../models/todo";

const router = express.Router();

// currentUser,

router.get("/", async (req, res) => {
  const todos = await Todo.find({}).populate("userId", "-password");
  res.send(todos);
});

router.get(
  "/me",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const todo = await Todo.find({ userId: req.currentUser!.id }).populate(
      "userId",
      "-password"
    );
    res.send(todo);
  }
);

export { router as allTodoRouter };
