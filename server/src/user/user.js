import express from "express";
import userModel from "./model.js";
import { generateToken } from "../auth/token.js";
import { tokenAuth } from "../auth/auth.js";
// =============================
const userRouter = express.Router();
// =================================
userRouter.post("/signup", async (req, res, next) => {
  try {
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
userRouter.get("/signup/:id", tokenAuth, async (req, res, next) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    res.send(getUser);
  } catch (error) {
    console.log(error);
  }
});
// ================================
userRouter.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.verifyUser(email, password);
    if (user) {
      const token = await generateToken({ id: user._id });
      res.send({ token });
    }
  } catch (error) {
    console.log(error);
    console.log("Not a user! Get Token");
  }
});
// ================================
export default userRouter;
