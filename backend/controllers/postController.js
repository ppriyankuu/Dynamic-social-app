import postModel from "../models/postModel.js";
import userModel from "../models/UserModel.js";

const getPosts = async (req, res) => {
  try {
    const response = await postModel.find({});

    res.status(200).json(response);
  } catch (error) {
    console.log(`error in getRecipes: ${error.message}`);
  }
};

const createPost = async (req, res) => {
  const post = new postModel(req.body);

  try {
    const response = await post.save();

    await userModel.findByIdAndUpdate(
      req.body.owner,
      {
        $push: { posts: response._id },
      },
      { new: true }
    );

    res.status(200).json(response);
  } catch (err) {
    console.error(`error in createPost: ${err.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res
        .status(400)
        .json({ message: "Both postId and userId are required." });
    }

    const post = await postModel.findById(postId);
    const user = await userModel.findById(userId);

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(user.liked)) {
      user.liked = [];
    }

    user.liked.push(post);
    await user.save();

    res.status(200).json({ liked: user.liked });
  } catch (error) {
    console.log(`error: ${error.message}`);
    res.status(500).json({ message: "error liking post" });
  }
};

const getLikedPost = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.json({ liked: user?.liked });
  } catch (error) {
    console.log(`error in getLikedPost: ${error.message}`);
    res.status(500).json({ message: "Error fetching saved recipes" });
  }
};

const getLikedPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.liked) {
      return res.json({ liked: [] });
    }

    const likedPosts = await postModel.find({
      _id: { $in: user.liked },
    });

    res.json({ likedPosts });
  } catch (error) {
    console.log(`error in getlikedPosts: ${error.message}`);
    res.status(500).json({ message: "Error fetching saved recipes" });
  }
};

const getCreatedPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.liked) {
      return res.json({ liked: [] });
    }

    const createdPosts = await postModel.find({
      _id: { $in: user.posts },
    });

    res.json({ createdPosts });
  } catch (error) {
    console.log(`error in getCreatedPosts: ${error.message}`);
    res.status(500).json({ message: "Error fetching saved recipes" });
  }
};

export {
  getPosts,
  createPost,
  likePost,
  getLikedPost,
  getLikedPosts,
  getCreatedPosts,
};
