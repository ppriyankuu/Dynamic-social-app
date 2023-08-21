/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await axios.get("http://localhost:8000/posts/");
        setPosts(postsResponse.data);
      } catch (error) {
        console.log(`error fetching posts: ${error.message}`);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:8000/auth/");
        setUserDetails(usersResponse.data.users);
      } catch (error) {
        console.log(`error fetching user details: ${error.message}`);
      }
    };

    const fetchLikedPosts = async () => {
      try {
        const userId = window.localStorage.getItem("userId");
        const likedPostsResponse = await axios.get(
          `http://localhost:8000/posts/liked/ids/${userId}`
        );
        const likedPostIds = likedPostsResponse.data.liked || [];
        setLikedPosts(likedPostIds);
      } catch (error) {
        console.log(`error fetching liked posts: ${error.message}`);
      }
    };

    fetchPosts();
    fetchUserDetails();
    fetchLikedPosts();
  }, []);

  const getUsernameById = (userId) => {
    const user = userDetails.find((user) => user._id === userId);
    return user ? user.username : "Unknown User";
  };

  const handleLike = async (postId) => {
    const userId = window.localStorage.getItem("userId");
    try {
      await axios.put("http://localhost:8000/posts", { postId, userId });
      setLikedPosts([...likedPosts, postId]);
    } catch (error) {
      console.log(`error liking the post: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-full px-3 py-2 border-2 flex flex-col justify-center items-center gap-5 border-solid border-black rounded-3xl">
      <h1 className="font-bold text-3xl">Feeds</h1>
      <ul className="w-full flex flex-col justify-center items-center gap-8">
        {posts.map((item, index) => {
          return (
            <li
              key={index}
              className="max-w-[600px] w-full p-5 border-2 border-solid border-black rounded-2xl bg-purple-300"
            >
              <div className="overflow-hidden rounded-xl my-1">
                <img
                  className="w-[100%] object-cover"
                  src={item.imgUrl}
                  alt="/"
                />
              </div>
              <h1 className="font-semibold text-center w-[60%] my-2 mt-3 rounded-full border-2 border-solid border-black font-mono bg-white text-xl px-4">
                Posted by: {getUsernameById(item.owner)}
              </h1>
              <div className="font-mono text-lg px-4 flex items-center justify-between">
                <h2 className="basis-[90%]">
                  <span className="font-bold text-xl">Description:</span>{" "}
                  {item.desc}
                </h2>
                {likedPosts.includes(item._id) ? (
                  <AiFillLike color="blue" size={28} />
                ) : (
                  <AiFillLike
                    color="white"
                    onClick={() => handleLike(item._id)}
                    size={28}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
