import React, { useEffect, useState } from "react";
import { deletePost, fetchPost, Search } from "../../lib/Post.sanity";
import MasonryLayout from "../../lib/MasonryLayout";
const Feed = ({ user, searchQuery }: any) => {
  const [post, setPost] = useState([]);
  const userId = user?._id;

  useEffect(() => {
    const fetchPost_details = async () => {
      const result = await fetchPost();
      setPost(result);
    };
    fetchPost_details();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (searchQuery !== "All" && searchQuery !== "") {
        const category_post = await Search(searchQuery);
        console.log(category_post);
        setPost(category_post);
        return;
      } else {
        const result = await fetchPost();

        setPost(result);
      }
    };
    fetch();
  }, [searchQuery, userId]);

  return (
    <div className="h-screen  center md:block  w-full   ">
      <div className="h-full pb-[150px] overflow-y-scroll">
        {post && <MasonryLayout posts={post} userId={userId} />}
      </div>
    </div>
  );
};

export default Feed;
