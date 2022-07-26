import mongoose from "mongoose";
const { Schema, model } = mongoose;
// =============================
const commentSchema = new Schema({
  comment: { type: String },
});
const memorySchema = new Schema({
  title: { type: String },
  memory: { type: String },
  name: { type: String },
  creator: { type: String },
  tags: [String],
  url: { type: String },
  url2: { type: String },
  selectedFile: { type: String },
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
export default model("memory", memorySchema);
