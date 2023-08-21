/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BiLogOut } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [userDetials, setUserDetials] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = window.localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8000/auth/${userId}`
        );
        setUserDetials(response.data.user);
      } catch (error) {
        console.error(`error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("likedPosts");
    navigate("/login");
  };

  return (
    <div className="w-full border-2 border-solid border-black rounded-3xl h-full pb-5">
      <h1 className="text-center font-bold text-2xl my-2">Profile</h1>
      <div className="grid grid-cols-3 gap-5 p-5">
        <div className="row-span-1 rounded-xl border-2 border-solid border-black bg-purple-300 flex flex-col justify-center items-center gap-2 p-2">
          <button className="py-1 w-full bg-white text-md font-semibold rounded-full">
            <Link to="/liked">Liked Posts</Link>
          </button>
          <button className="py-1 w-full bg-black text-md font-semibold text-white rounded-full">
            <Link to="/posts">Your Posts</Link>
          </button>
        </div>
        <div className="w-full h-full col-span-2 row-span-2 rounded-xl p-5 border-2 border-solid border-black bg-purple-300">
          <h2 className="text-center font-semibold text-xl">Details</h2>
          <p className="h-[30px] font-semibold text-lg bg-white my-5 px-4 py-2 pb-9 rounded-lg">
            Username : {userDetials.username}
          </p>
          <p className="h-[30px] font-semibold text-lg bg-white my-5 px-4 py-2 pb-9 rounded-lg">
            Email : {userDetials.email}
          </p>
          <p className="h-[30px] font-semibold text-lg bg-white my-5 px-4 py-2 pb-9 rounded-lg">
            Password : *********
          </p>
          <Link to="/update">
            <button className="py-2 px-4 flex items-center gap-2 bg-white font-semibold border-2 border-solid border-black rounded-full">
              <GrUpdate />
              Update Details
            </button>
          </Link>
        </div>
        <div className="w-full flex justify-center items-center h-full row-span-1 rounded-xl border-2 border-solid border-black bg-purple-300">
          <button
            onClick={logOut}
            className="py-2 px-4 flex items-center gap-2 bg-white font-bold text-lg border-2 border-solid border-black rounded-full"
          >
            <BiLogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
