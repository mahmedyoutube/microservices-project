import express, { Request, Response } from "express";
import { currentUser, requireAuth } from "../middlewares";
import { User } from "../models/user";

const router = express.Router();

// currentUser,

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

export { router as allUserRouter };
