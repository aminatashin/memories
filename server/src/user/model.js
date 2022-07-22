import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;
// =============================
const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    comfirmPassword: { type: String },
    likes: { type: [String], default: [] },
  },
  { timestamps: true }
);
// =============================
userSchema.pre("save", async function (next) {
  const user = this;
  const password = this.password;
  const hash = await bcrypt.hash(password, 11);
  user.password = hash;
  next();
});
// =============================
userSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};
// =============================
userSchema.static("verifyUser", async function (email, plainPW) {
  const user = await this.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(plainPW, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
});
// =============================
export default model("user", userSchema);
