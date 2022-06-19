import React, { useEffect, useState } from "react";
import { fetchPost } from "../../lib/Post.sanity";
import MasonryLayout from "../../lib/MasonryLayout";
const Feed = ({ user }: any) => {
  const [post, setPost] = useState([]);
  const userId = user?._id;
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchPost();
      const filter_result = result.filter((item: any) => {
        return !item._id.includes("drafts");
      });

      setPost(filter_result);
    };
    fetch();
  }, [userId]);

  return (
    <div className="h-screen  center md:block  w-full   ">
      <div className="h-full pb-[150px] overflow-y-scroll">
        {post && <MasonryLayout posts={post} userId={userId} />}
      </div>
    </div>
  );
};

export default Feed;
