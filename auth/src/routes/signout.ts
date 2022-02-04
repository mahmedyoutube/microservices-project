import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  // add token into blacklist
  // you can further do this
  // I am leaving on you
  res.send({});
});

export { router as signOutRouter };
