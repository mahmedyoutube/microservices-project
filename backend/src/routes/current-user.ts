import express from "express";
import { currentUser } from "../middlewares";

const router = express.Router();

// currentUser,

router.get("/", currentUser, async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
