import express from "express";
import { currentUser, requireAuth } from "../../middlewares";
import { Todo } from "../../models/todo";

const router = express.Router();

// currentUser,

router.delete("/:id", currentUser, requireAuth, async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.send(todo);
});

export { router as deleteTodoRouter };
