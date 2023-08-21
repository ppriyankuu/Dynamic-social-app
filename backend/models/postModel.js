import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const postModel = mongoose.model("posts", postSchema);

export default postModel;
