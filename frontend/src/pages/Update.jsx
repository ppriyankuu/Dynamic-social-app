/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = window.localStorage.getItem("userId");
      const updatedData = {
        username,
        email,
        password,
      };

      const response = await axios.put(
        `http://localhost:8000/auth/${userId}`,
        updatedData
      );

      alert("Details updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(`error updating ${error.message}`);
    }
  };

  return (
    <div className="w-[400px] mx-auto mt-10 p-5 shadow-lg shadow-black rounded-xl">
      <div className="flex justify-center gap-28 items-center font-semibold text-xl">
        <div>
          <p>Update Details</p>
          <div className="h-1 w-full bg-orange-400"></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center pt-10 gap-5"
      >
        <input
          className="w-full border-2 border-solid border-black py-2 px-4 my-2 rounded-lg"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="w-full border-2 border-solid border-black py-2 px-4 my-2 rounded-lg"
          type="text"
          value={email}
          placeholder="Email Address"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="w-full border-2 border-solid border-black py-2 px-4 my-2 rounded-lg"
          type="password"
          value={password}
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="py-2 px-5 bg-orange-400 rounded-lg border-2 border-solid border-black"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
