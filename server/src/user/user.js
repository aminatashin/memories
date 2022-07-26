import express from "express";
import mongoose from "mongoose";
import userModel from "./model.js";
import memoryModel from "../memories/model.js";
import { generateToken } from "../auth/token.js";
import { tokenAuth } from "../auth/auth.js";

// =============================
const userRouter = express.Router();
// =================================

userRouter.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastname, email, password, confirmPassword } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user has already an account!" });
    if (req.body.password !== req.body.confirmPassword)
      return res.status(400).json({ message: "confirm pasword is not match!" });
    const newUser = new userModel(req.body);
    const { _id } = await newUser.save();
    res.send({ _id });
  } catch (error) {
    next(error);
    console.log(error);
  }
});

// ================================
userRouter.get("/signup", tokenAuth, async (req, res, next) => {
  try {
    const getUser = await userModel.find();
    res.send(getUser);
  } catch (error) {
    console.log(error);
  }
});
// ================================
userRouter.get("/signup/me", tokenAuth, async (req, res, next) => {
  const getuser = await userModel.findById(req.user._id);

  res.send(getuser);
});

// ================================
userRouter.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.verifyUser(email, password);
    if (user) {
      const token = await generateToken({ _id: user._id, email: user.email });
      res.send({ token });
    }
  } catch (error) {
    console.log(error);
    console.log("Not a user! Get Token");
  }
});
// userRouter.put("/like/:id", tokenAuth, async (req, res, next) => {
//   try {
//     const { id: _id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(_id))
//       return res.status(404).send(`No post with id`);
//     const user = await userModel.findById(req.user._id);

//     const post = await memoryModel.findById(_id);

//     const index = user.likes.findIndex((id) => id === String(post._id));

//     if (index === -1) {
//       user.likes.push(post._id);
//     } else {
//       user.likes = user.likes.filter((id) => id !== String(user._id));
//     }
//     const updatedPost = await userModel.findByIdAndUpdate(req.user._id, user, {
//       new: true,
//     });
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     console.log(error);
//   }
// });
// ================================
export default userRouter;
