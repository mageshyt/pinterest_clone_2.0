import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { fetchUsers } from "../lib/CreateUser.sanity";
import { AiOutlineCloudUpload } from "react-icons/ai";
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
        <div className="flex max-w-4xl  mt-10 mx-auto items-start">
          <div className="flex flex-col w-[400px] rounded-xl  p-2 h-[400px]  bg-gray-300">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-2xl">
                <AiOutlineCloudUpload />
              </p>
              <p className="text-lg">Click to upload</p>
            </div>

            <p className="mt-32 text-gray-400">
              Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF
              less than 20MB
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default CreatePost;
