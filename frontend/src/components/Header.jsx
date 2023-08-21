/* eslint-disable no-unused-vars */
import React from "react";
import { BsPersonCircle, BsPersonBoundingBox } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { IoIosCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, _] = useCookies(["access_token"]);

  return (
    <div className=" w-[678px] mx-auto rounded-full flex items-center justify-center gap-20 border-2 border-solid border-black mt-4 mb-2 bg-purple-300 h-[80px]">
      <div>
        <Link to="/">
          <button className="flex items-center font-semibold gap-2 py-2 px-3 bg-white rounded-full hover:bg-slate-300">
            <ImHome />
            Home
          </button>
        </Link>
      </div>
      <div>
        {cookies.access_token && (
          <Link to="/create">
            <button className="flex font-semibold items-center gap-1 py-2 px-3 bg-white rounded-full hover:bg-slate-300">
              <IoIosCreate />
              Create Post
            </button>
          </Link>
        )}
      </div>
      <div>
        {!cookies.access_token ? (
          <Link to="/login">
            <button className="flex font-semibold items-center gap-2 py-2 px-3 bg-white rounded-full hover:bg-slate-300">
              <BsPersonBoundingBox />
              Authorization
            </button>
          </Link>
        ) : (
          <Link to="/profile">
            <button className="flex font-semibold items-center gap-2 py-2 px-3 bg-white rounded-full hover:bg-slate-300">
              <BsPersonCircle />
              Profile
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
