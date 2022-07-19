import express from "express";
import commentModel from "./model.js";
const commentRouter = express.Router();
commentRouter.post("/:id", async (req, res, next) => {
  try {
    const comment = new commentModel(req.body);
    const { _id } = await comment.save();
    res.json({ _id });
  } catch (error) {
    console.log(`from comment Post router${error}`);
  }
});
commentRouter.get("/", async (req, res, next) => {
  try {
    const getComment = await commentModel.find();

    res.json(getComment);
  } catch (error) {
    console.log(`from comment Get router${error}`);
  }
});
export default commentRouter;
