import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { fetchUsers } from "../lib/CreateUser.sanity";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PostForm from "../components/Form/PostForm";
import Spinner from "../lib/Spinner";
import { client } from "../lib/sanityClient";
const CreatePost = () => {
  const [user, setUser] = useState(null);
  //! session
  const { data, status } = useSession();
  const currentUser: string | any = data?.user?.email?.split("@")[0];
  //! fetch user
  useEffect(() => {
    const fetch = () => {
      fetchUsers(currentUser).then((res) => {
        setUser(res[0]);
      });
    };
    fetch();
  }, [currentUser]);
  //! loading state

  const [loading, setLoading] = useState(false);
  //! image
  const [image, setImage] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const uploadImage = (e: any) => {
    console.log(e.target.files[0]);
    const selectedFile = e.target.files[0];
    setLoading(true);
    client.assets
      .upload("image", selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((document) => {
        setImageAsset(document);
        setImageUrl(document.url);
        console.log(document);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Upload failed:", error.message);
      });
  };
  return (
    user && (
      <div className="flex flex-col">
        {/* Header */}
        <Header user={user} />
        {/* Create Post */}
        <div className="flex space-x-4 max-w-4xl flex-col flex-1 sm:flex-row bg-white shadow-xl p-4 rounded-xl  mt-10 mx-auto items-center justify-between">
          {/* upload image */}
          <label className="w-[400px] rounded-xl  p-2 h-[500px]  bg-[#F2F2F2]">
            <div className="border-2 h-full center flex-col w-full border-black rounded-xl">
              {imageUrl.length == 0 ? (
                <>
                  {!loading ? (
                    <UploadImage uploadImage={uploadImage} />
                  ) : (
                    <Spinner message="Uploading" />
                  )}
                </>
              ) : (
                <>
                  {imageUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={imageUrl}
                        alt=""
                        className="w-full h-full p-2 rounded-xl object-cover"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </label>
          {/* create post */}

          <div className="flex-1 h-[400px] ">
            <PostForm
              user={user}
              imageAsset={imageAsset}
              userId={currentUser}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default CreatePost;

const UploadImage = ({ uploadImage }: any) => {
  return (
    <>
      {" "}
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-2xl">
          <AiOutlineCloudUpload />
        </p>
        <p className="text-lg ">Click to upload</p>
      </div>
      <p className="mt-32 text-center text-gray-400">
        Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less
        than 20MB
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => uploadImage(e)}
        className="w-0 h-0"
      />
    </>
  );
};
