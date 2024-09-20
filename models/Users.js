import { Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema({
  username: { type: String, unique: String },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
