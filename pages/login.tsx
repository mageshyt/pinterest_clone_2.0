import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
const login = () => {
  const LoginVideo = "/videos/share.mp4";
  const data = useSession();
  const route = useRouter(); //! router
  useEffect(() => {
    if (data.status === "authenticated") {
      route.push("/");
    }
  }, [data.status]);
  return (
    <div className=" bg-blackOverlay w-full  h-screen">
      <div className="relative  h-full w-full">
        <video
          src={LoginVideo}
          controls={false}
          autoPlay={true}
          loop={true}
          muted={true}
          typeof="video/mp4"
          className="w-full h-full object-cover"
        />
      </div>
      {/* sigin in */}
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        {/* Logo */}

        <div
          onClick={() => signIn()}
          className="px-8 cursor-pointer py-4 rounded-lg flex bg-white "
        >
          <div>
            <FcGoogle className=" text-2xl" />
          </div>

          <h1>Sing In with Google</h1>
        </div>
      </div>
    </div>
  );
};

//   <button onClick={() => signIn()}>Sign in with Google</button>
export default login;
