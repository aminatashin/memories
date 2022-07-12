import mongoose from "mongoose";
const { Schema, model } = mongoose;
// =============================
const memorySchema = new Schema({
  title: { type: String },
  memory: { type: String },
  creator: { type: String },
  creator: { type: String },
  tags: [String],
  selectedFile: { type: String },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
export default model("memory", memorySchema);
