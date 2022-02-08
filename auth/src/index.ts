import mongoose from "mongoose";
require("dotenv").config({});
import { app } from "./app";
import "./events/connection"; // to initialize connection

const start = async () => {
  console.log("starting up...");
  if (!process.env!.JWT_SECRET!) {
    throw new Error("JWT key must be valid");
  }

  try {
    await mongoose.connect(process.env!.MONGODB_URI!);

    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }

  app.listen(process.env.PORT, () => {
    console.log("Server is listening on the port ", process.env.PORT);
  });
};

start();
