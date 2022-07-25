import express from "express";
import mongoose from "mongoose";
import memoryModel from "./model.js";
import { tokenAuth } from "../auth/auth.js";
// =============================
const memoryRouter = express.Router();
// =================================
memoryRouter.post("/", tokenAuth, async (req, res) => {
  const post = req.body;

  const newPostMessage = new memoryModel({
    ...post,
    creator: req.user,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
memoryRouter.post("/comment/:id", tokenAuth, async (req, res) => {
  try {
    const { id: _id } = req.params;
    console.log("ID", _id);
    console.log(req.body);

    const post = await memoryModel.findById(_id);

    const updatedPost = await memoryModel.findByIdAndUpdate(
      _id,
      {
        $push: { comments: req.body.comment },
      },

      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(`from Post Commentrouter${error}`);
  }
});
// ===================================================
memoryRouter.post("/", tokenAuth, async (req, res) => {
  const post = req.body;

  const newPostMessage = new memoryModel({
    ...post,
    creator: req.user,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// =================================
// memoryRouter.get("/", async (req, res, next) => {
//   try {
//     const getMemory = await memoryModel.find();

//     res.json(getMemory);
//   } catch (error) {
//     next(error);
//     console.log(error);
//   }
// });
memoryRouter.get("/", async (req, res, next) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await memoryModel.countDocuments();
    const getMemory = await memoryModel
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.json({
      data: getMemory,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
});
// =================================
memoryRouter.get("/:id", async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const getMemory = await memoryModel.findById(_id);

    res.json(getMemory);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

// ======================================
memoryRouter.get("/search", async (req, res, next) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const getMemory = await memoryModel.find({ title: title });
    res.json(getMemory);
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
// memoryRouter.put("/like/:id", tokenAuth, async (req, res, next) => {
//   try {
//     const { id: _id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(_id))
//       return res.status(404).send(`No post with id`);
//     const post = await memoryModel.findById(_id);

//     const index = post.likes.findIndex((id) => id === String(_id));

//     if (index === -1) {
//       post.likes.push(_id);
//     } else {
//       post.likes = post.likes.filter((id) => id !== String(_id));
//     }
//     const updatedPost = await memoryModel.findByIdAndUpdate(_id, post, {
//       new: true,
//     });
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     console.log(error);
//   }

// });
// ======================================
export default memoryRouter;
