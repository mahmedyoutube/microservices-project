import express from "express";
import { currentUser, requireAuth } from "../../middlewares";
import { Chat } from "../../models/chat";

const router = express.Router();

// currentUser,

router.delete("/:id", currentUser, requireAuth, async (req, res) => {
  // delete Chat

  const chat = await Chat.findByIdAndDelete(req.params.id);
  res.send(chat);
});

export { router as deleteChatRouter };
