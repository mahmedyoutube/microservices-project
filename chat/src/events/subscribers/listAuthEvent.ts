import express, { Request, Response } from "express";
import { Chat } from "../../models/chat";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
   
});

export { router as listAuthEventRouter };
