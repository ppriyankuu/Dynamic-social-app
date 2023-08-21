/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.id);
      alert("Successfully Logged in!");
      navigate("/");
    } catch (error) {
      console.log(`error in login: ${error.message}`);
      alert("Invalid credentials!");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="w-[400px] mx-auto mt-10 p-5 shadow-lg shadow-black rounded-xl">
      <div className="flex justify-center gap-28 items-center font-semibold text-xl">
        <Link to="/login">
          <p>Login</p>
          <div className="h-1 w-full bg-orange-400"></div>
        </Link>
        <Link to="/signup">
          <p className="text-center">Sign Up</p>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center pt-20 gap-5"
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
          type="password"
          value={password}
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="py-2 px-5 bg-orange-400 rounded-lg border-2 border-solid border-black"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
