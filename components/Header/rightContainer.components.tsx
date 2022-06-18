import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import {
  AiOutlineSearch,
  AiFillBell,
  AiFillMessage,
  AiOutlineDown,
} from "react-icons/ai";

const style = {
  icon: "text-2xl  text-gray-500  cursor-pointer",
  Icon_bg: "hover:bg-gray-200 rounded-full p-1 flex items-center  ",
};

interface Props {
  userImage: string | undefined | null;
  UserId: string | undefined | null;
}

const RightContainer = ({ userImage, UserId }: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-2">
      <div className={style.Icon_bg}>
        <AiFillBell className={style.icon} />
      </div>
      {/* Fill message */}
      <div className={style.Icon_bg}>
        <AiFillMessage className={style.icon} />
      </div>
      {/* User Image */}
      {userImage && (
        <div className={style.Icon_bg}>
          <img
            onClick={() => {
              router.push(`/user/${UserId}`);
            }}
            className="rounded-full w-8 h-8 cursor-pointer object-contain"
            src={userImage}
            alt="user"
          />
        </div>
      )}

      {/* down */}
      <div>
        <AiOutlineDown className={"text-xl  text-gray-500  cursor-pointer"} />
      </div>
    </div>
  );
};

export default RightContainer;
