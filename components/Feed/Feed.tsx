import React, { useEffect, useState } from "react";
import { fetchPost } from "../../lib/Feed.sanity";
import PostCard from "./PostCard";

const Feed = ({user}:any) => {
  const [post, setPost] = useState([]);
  const userId = user?._id;
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchPost();
      setPost(result);
    };
    fetch();
  }, []);
  
  return (
    <div>
      <h1>Feed</h1>
      <div className="grid grid-cols-3 ">
        {post &&
          post.map((item: any, index: number) => {
            return <PostCard item={item} userID={userId} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Feed;
