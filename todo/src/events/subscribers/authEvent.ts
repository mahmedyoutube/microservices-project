import express, { Request, Response } from "express";
import { Chat } from "../../models/chat";
import mongoose from "mongoose";
import { User } from "../../models/user";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, userId } = req.body;
  
  console.log(" =========== auth event received in todo service ============== ", req.body);

  const user = User.build({ email, userId });
  await user.save();
  res.send("done");
});

export { router as authEvent };
