import mongoose from "mongoose";
const { Schema, model } = mongoose;
// =============================
const memorySchema = new Schema({
  title: { type: String },
  memory: { type: String },
  name: { type: String },
  creator: { type: String },
  tags: [String],
  selectedFile: { type: String },
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
export default model("memory", memorySchema);
