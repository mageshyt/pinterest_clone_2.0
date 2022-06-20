import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { randomImage } from "../../assets/data";
import Spinner from "../../lib/Spinner";
import {
  fetchUser,
  useSavedPost,
  useUserPost,
} from "../../lib/hooks/user.hook";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import MasonryLayout from "../../lib/MasonryLayout";
interface User {
  username: string;
  email: string;
  _id: string;
  profile_img: string;
}
const style = {
  userImage: "rounded-full w-20 h-20 -mt-10 shadow-xl object-cover",
  bannerImage:
    " w-full md:h-[370px] h-[300px] shadow-xl xl:h-[460px] object-cover",
  log_out_btn:
    "absolute top-0 right-0 p-2 mx-4 mt-4 animate hover:scale-110 cursor-pointer bg-white rounded-full ",
  activeBtnStyles:
    "bg-red-500 text-white font-bold p-2 rounded-full text-center w-[80px] cursor-pointer outline-none",
  notActiveBtnStyles:
    "bg-primary  text-black font-bold p-2 rounded-full w-[80px] text-center cursor-pointer outline-none",

  homePageBtn:
    "absolute top-0 left-0 p-2 mx-4 mt-4 animate hover:scale-110 cursor-pointer bg-white rounded-full",
};
const UserId = () => {
  const router = useRouter();
  const { userId }: any = router.query;
  const image = randomImage();
  const user: User | any = fetchUser(userId);

  const { data } = useSession();

  //! to track the active btn
  const [active, setActive] = useState("created");

  const currentUser = data?.user?.email?.split("@")[0];

  const posts = useUserPost(userId);

  const savedPost = useSavedPost(userId);
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      {user && (
        <div className="center w-full space-y-5 flex-col">
          <div className="center w-full flex-col">
            <img className={style.bannerImage} src={image} alt="user-pic" />
            {/* user image */}
            <img
              src={user.profile_img}
              alt="user-image"
              className={style.userImage}
            />
            {/* user details*/}
            <div>
              <h1 className="font-bold text-2xl text-center mt-3">
                {user.username}
              </h1>
            </div>
            {currentUser === user._id && (
              <>
                {/* Logo out */}
                <div className={style.log_out_btn}>
                  <AiOutlineLogout
                    className="text-3xl text-red-500 hover:text-red-600"
                    onClick={() => signOut()}
                  />
                </div>
              </>
            )}
            {/* go back to home page */}

            <div className={style.homePageBtn}>
              <AiOutlineHome
                className="text-3xl text-primary hover:text-primary-600"
                onClick={() => router.push("/")}
              />
            </div>
          </div>
          {/* Saved post */}
          <div className="mt-6 w-[250px] center ">
            <span
              onClick={() => setActive("created")}
              className={
                active === "created"
                  ? style.activeBtnStyles
                  : style.notActiveBtnStyles
              }
            >
              created
            </span>
            <span
              onClick={() => setActive("saved")}
              className={
                active === "saved"
                  ? style.activeBtnStyles
                  : style.notActiveBtnStyles
              }
            >
              Saved
            </span>
          </div>

          <div className="w-full">
            {active === "created" && (
              <div className="h-full pb-[150px] overflow-y-scroll">
                {posts && <MasonryLayout posts={posts} userId={userId} />}
              </div>
            )}
            {/* Saved post */}
            {active === "saved" && (
              <div className="h-full pb-[150px] overflow-y-scroll">
                {savedPost && (
                  <MasonryLayout posts={savedPost} userId={userId} />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {!user && <Spinner message="fetching the user" />}
    </div>
  );
};

export default UserId;
