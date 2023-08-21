/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";

const CreatePost = () => {
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("userId");
  const [post, setPost] = useState({
    desc: "",
    imgUrl: "",
    owner: userId,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`http://localhost:8000/posts`, post);

      alert(`Successfully submitted`);
      setPost({ desc: "", imgUrl: "", owner: userId });
      navigate("/");
    } catch (error) {
      console.error(`error: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-full border-2 border-solid border-black p-5 rounded-3xl flex flex-col gap-5 justify-center items-center">
      <h1 className="font-bold text-3xl">Create Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
        <textarea
          name="desc"
          id=""
          className="border-2 border-solid border-black py-2 px-4 rounded-xl resize-none"
          rows="3"
          value={post.desc}
          placeholder="Description"
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="imgUrl"
          value={post.imgUrl}
          className="border-2 border-solid border-black py-2 px-4 rounded-xl"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="py-2 px-5 bg-purple-300 rounded-lg border-2 border-solid border-black flex items-center justify-center gap-1"
        >
          <BsFillFileEarmarkArrowUpFill size={24} />
          Post it!
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
