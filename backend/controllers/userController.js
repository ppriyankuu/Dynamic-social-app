import userModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "username");
    res.status(200).json({ users });
  } catch (error) {
    console.log(`error fetching users: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  const salt = 10;
  const { username, email, password } = req.body;

  let existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists. Login instead" });
  }

  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new userModel({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(`erorr: ${error.message}`);
  }

  return res.status(200).json({ user });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  let existingUser = await userModel.findOne({ username });

  if (!existingUser) {
    return res.status(404).json({ message: "Invalid credentials" });
  }

  const checkPassword = bcrypt.compareSync(password, existingUser.password);

  if (!checkPassword) {
    return res.status(404).json({ message: "incorrect password, try again" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY);

  return res
    .status(200)
    .json({ message: "Login successful", token, id: existingUser._id });
};

const userDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(`error fetching userdetails: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    if (updatedData.password) {
      const salt = 10;
      updatedData.password = bcrypt.hashSync(updatedData.password, salt);
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(`error updating userdetails: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signup, login, userDetails, updateDetails, getUsers };
