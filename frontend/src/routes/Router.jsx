import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Liked from "../pages/Liked";
import Post from "../pages/Post";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Update from "../pages/Update";
import CreatePost from "../pages/CreatePost";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/posts" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/update" element={<Update />} />
    </Routes>
  );
};

export default Router;
