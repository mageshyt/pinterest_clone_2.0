import React, { useEffect, useState } from "react";
import { deletePost, fetchPost, Search } from "../../lib/Post.sanity";
import MasonryLayout from "../../lib/MasonryLayout";
import { NextPage } from "next";
const Feed = ({ user, searchQuery, posts }: any) => {
  const [post, setPost] = useState();
  const userId = user?._id;

  useEffect(() => {
    const fetch = async () => {
      if (searchQuery !== "All" && searchQuery !== "") {
        const category_post = await Search(searchQuery);
        setPost(category_post);
        return;
      }
      setPost(posts);
    };
    fetch();
  }, [searchQuery, userId]);
  // console.log("userId", post);
  return (
    <div className="h-screen  center md:block  w-full   ">
      <div className="h-full pb-[150px] overflow-y-scroll">
        {post && <MasonryLayout posts={post} userId={userId} />}
      </div>
    </div>
  );
};

export default Feed;
