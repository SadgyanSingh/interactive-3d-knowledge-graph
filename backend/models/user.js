import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  }
});

export default mongoose.model("User", userSchema);
