import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  liked: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
