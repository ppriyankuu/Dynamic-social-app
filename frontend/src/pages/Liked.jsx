import { useState, useEffect } from "react";
import axios from "axios";

const LikedPosts = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/posts/liked/${userId}`
        );
        setLikedPosts(response.data.likedPosts);
      } catch (error) {
        console.log(`error fetching liked posts: ${error.message}`);
      }
    };

    fetchLikedPosts();
  }, [userId]);

  return (
    <div className="w-full h-full px-3 py-2 border-2 flex flex-col justify-center items-center gap-5 border-solid border-black rounded-3xl">
      {likedPosts.length === 0 ? (
        <h1 className="font-bold text-3xl">You liked nothing.</h1>
      ) : (
        <h1 className="font-bold text-3xl">Liked Posts</h1>
      )}

      <ul className="w-full flex flex-col justify-center items-center gap-8">
        {likedPosts.map((item, index) => {
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
              <div className="font-mono text-lg px-4 flex items-center mt-2 justify-between">
                <h2 className="basis-[90%]">
                  <span className="font-bold text-xl">Description:</span>{" "}
                  {item.desc}
                </h2>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LikedPosts;
