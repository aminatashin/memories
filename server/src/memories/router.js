import express from "express";
import mongoose from "mongoose";
import memoryModel from "./model.js";

// =============================
const memoryRouter = express.Router();
// =================================
memoryRouter.post("/", async (req, res, next) => {
  try {
    const newMemory = new memoryModel(req.body);
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

memoryRouter.put("/:id", async (req, res, next) => {
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
memoryRouter.delete("/:id", async (req, res, next) => {
  const userDelete = await memoryModel.findByIdAndDelete(req.params.id);
  res.send(userDelete);
});
// ======================================
export default memoryRouter;
