import express from "express";
import {
  getUsers,
  signup,
  login,
  userDetails,
  updateDetails,
} from "../controllers/userController.js";

const router = express.Router();

// get the users
router.get("/", getUsers);

// for signing up a new user
router.post("/signup", signup);

// login user
router.post("/login", login);

//fetch user details
router.get("/:id", userDetails);

//update user details
router.put("/:id", updateDetails);

export default router;
