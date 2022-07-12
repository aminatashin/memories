import express from "express";
import mongoose from "mongoose";
import memoryModel from "./model.js";
import { tokenAuth } from "../auth/auth.js";
// =============================
const memoryRouter = express.Router();
// =================================
memoryRouter.post("/", async (req, res, next) => {
  try {
    const memory = req.body;
    const newMemory = new memoryModel({
      ...memory,
      creator: req.user._id,
      createdAt: new Date().toISOString(),
    });
    const { _id } = await newMemory.save();
    res.send({ _id });
  } catch (error) {
    next(error);
    console.log(error);
  }
});
// =================================
memoryRouter.get("/", async (req, res, next) => {
  try {
    const getMemory = await memoryModel.find();
    res.send(getMemory);
  } catch (error) {
    next(error);
    console.log(error);
  }
});
// ======================================
memoryRouter.get("/:id", async (req, res, next) => {
  try {
    const getMemory = await memoryModel.findById(req.params.id);
    res.send(getMemory);
  } catch (error) {
    next(error);
    console.log(error);
  }
});
// ======================================

memoryRouter.put("/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id`);

    const updatedPost = await memoryModel.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
});

// ======================================
memoryRouter.delete("/delete/:id", tokenAuth, async (req, res, next) => {
  try {
    const userDelete = await memoryModel.findByIdAndDelete(req.params.id);

    res.json(userDelete);
  } catch (error) {
    console.log(error);
  }
});
// ======================================
memoryRouter.put("/like/:id", tokenAuth, async (req, res, next) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id`);
    const post = await memoryModel.findById(_id);

    const modify = await memoryModel.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(modify);
  } catch (error) {
    console.log(error);
  }
});
// ======================================
export default memoryRouter;
