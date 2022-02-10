import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";
import { allUserRouter } from "./routes/all";

const app = express();
// app.set("trust proxy", true);
app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== 'test',
//   })
// );
app.use("/", allUserRouter);
app.use("/currentUser", currentUserRouter);
app.use("/signin", signInRouter);
app.use("/signout", signOutRouter);
app.use("/signup", signUpRouter);

app.get("/", async (req, res) => {
  res.send({ message: "welcome" });
});

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
