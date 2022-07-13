import express from "express";
import mongoose from "mongoose";
import memoryModel from "./model.js";
import { tokenAuth } from "../auth/auth.js";
// =============================
const memoryRouter = express.Router();
// =================================
memoryRouter.post("/", async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const memory = req.body;
    const newMemory = new memoryModel({
      ...memory,
      creator: _id,
      createdAt: new Date().toISOString(),
    });
    await newMemory.save();
    res.send(newMemory);
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
    const { id: _id } = req.params;
    const userDelete = await memoryModel.findByIdAndDelete(_id);

    res.json(userDelete);
  } catch (error) {
    console.log(error);
  }
});
// ======================================
memoryRouter.put("/like/:id", tokenAuth, async (req, res, next) => {
  // try {
  //   const { id: _id } = req.params;

  //   if (!mongoose.Types.ObjectId.isValid(_id))
  //     return res.status(404).send(`No post with id`);
  //   const post = await memoryModel.findById(_id);

  //   const index = post.likes.findIndex((id) => id === String(_id));

  //   if (index === -1) {
  //     post.likes.push(_id);
  //   } else {
  //     post.likes = post.likes.filter((id) => id !== String(_id));
  //   }
  //   const updatedPost = await memoryModel.findByIdAndUpdate(_id, post, {
  //     new: true,
  //   });
  //   res.status(200).json(updatedPost);
  // } catch (error) {
  //   console.log(error);
  // }
  const { id: _id } = req.params;

  if (!_id) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  const post = await memoryModel.findById(_id);

  const index = post.likes.findIndex((id) => id === String(_id));

  if (index === -1) {
    const updatedPost = await memoryModel.findByIdAndUpdate(
      _id,
      {
        $push: { likes: _id },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } else {
    post.likes = post.likes.filter((id) => id !== String(_id));
  }
});
// ======================================
export default memoryRouter;
