import { client } from "../sanityClient";

const { useEffect, useState } = require("react");
const { useSession } = require("next-auth/react");
const { fetchUsers } = require("../CreateUser.sanity");

export const fetchUser = (userId) => {
  const [user, setUser] = useState(null);
  const { data, status } = useSession();
  const default_userID = data?.user?.email?.split("@")[0];
  useEffect(() => {
    if (status === "unauthenticated") return;
    const fetch = async () => {
      const result = await fetchUsers(userId || default_userID);
      setUser(result[0]);
    };
    fetch();
  }, [status]);

  return user;
};

export const useUserPost = (userID) => {
  const query = `  *[_type == "post" && author._ref=="${userID}"]  {
   "image":image.asset->{
      url
  },
  "post_id":_id,
"postedBY":author->{
       _id,
          username,
          profile_img
      },
  } `;

  const [userPost, setUserPost] = useState(null);
  useEffect(() => {
    if (userID === null) return;
    const fetch = async () => {
      const result = await client.fetch(query);
      const filter_result = result.filter((item) => {
        return !item.post_id.includes("drafts");
      });
      setUserPost(filter_result);
    };
    fetch();
  }, [userID]);
  return userPost;
};

export const useSavedPost = (userID) => {
  const query = ` *[_type == 'post' && "${userID}" in save[].userId ] | order(_createdAt desc) {
  "post_id":_id,
   "image":image.asset->{
      url
  },
      "postedBY":author->{
       _id,
          username,
          profile_img
      },
  } `;
  const [savedPost, setSavedPost] = useState(null);
  useEffect(() => {
    if (userID === null) return;
    const fetch = async () => {
      const result = await client.fetch(query);
      const filter_result = result.filter((item) => {
        return !item.post_id.includes("drafts");
      });
      setSavedPost(filter_result);
    };
    fetch();
  }, [userID]);
  return savedPost;
};
