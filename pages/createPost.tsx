import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { fetchUsers } from "../lib/CreateUser.sanity";

const CreatePost = () => {
  const [user, setUser] = useState(null);
  //! session
  const { data, status } = useSession();
  //! fetch user
  useEffect(() => {
    const fetch = async () => {
      if (status === "authenticated") {
        const { email }: any = data?.user;
        const userId = email.split("@")[0];
        const result = await fetchUsers(userId);
        setUser(result[0]);
      }
    };
    fetch();
  }, []);

  //! to keep track the title and destination, and image
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");

  //! image asset
  const [imageAsset, setImageAsset] = useState(null);


  
  //! loading status
  const [loading, setLoading] = useState(false);
  return (
    user && (
      <div>
        {/* Header */}
        <Header user={user} />
        {/* Create Post */}
        <div></div>
      </div>
    )
  );
};

export default CreatePost;
