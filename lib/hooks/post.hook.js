import { useRouter } from "next/router";
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

export const UploadPost = async (newPost, imageAsset, userId) => {
  const { about, title, category, destination } = newPost;
  console.log(about, title, category, destination, imageAsset, userId);
  const post_doc = {
    _type: "post",
    title,
    about,
    category,
    destination,
    author: {
      _type: "reference",
      _ref: userId,
    },
    image: {
      asset: {
        _type: "reference",
        _ref: imageAsset._id,
      },
    },
  };
  const result = await client.create(post_doc);
  console.log(result);
  return result;
};
