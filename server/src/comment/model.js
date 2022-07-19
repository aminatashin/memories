import mongoose from "mongoose";
const { model, Schema } = mongoose;
const commentSchema = new Schema({
  comment: { type: String },
});
export default model("comment", commentSchema);
