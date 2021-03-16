// QUESTION: Combine files in models?
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  name: String,
  password: String,
  network: [String],
});

const UserModel = mongoose.model("User", userSchema, "users");

export { UserModel };
