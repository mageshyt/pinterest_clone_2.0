import React from "react";

const PostedBY = ({ postedBY }: any) => {
  return (
    postedBY && (
      <div className="bg-white flex space-x-2">
        <img
          src={
            typeof postedBY.profile_img === "string"
              ? postedBY.profile_img
              : "https://img.freepik.com/free-vector/hacker-avatar-flat_98292-5771.jpg?w=2000"
          }
          alt="user-image"
          className="w-8 h-8 rounded-full"
        />
        <span> {postedBY?.username || "unknown"}</span>
      </div>
    )
  );
};

export default PostedBY;
