import { client } from "../sanityClient";

const { useEffect, useState } = require("react");

const { fetchPostInfo } = require("../Post.sanity");

export const UsePost = (postId) => {
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchPostInfo(postId);
        
      setPost(result);
    };
    fetch();
  }, [postId]);
  return post;
};
