import express from "express";
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
export default memoryRouter;
