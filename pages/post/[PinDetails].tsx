import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Spinner from "../../lib/Spinner";

import { BsThreeDots, BsChevronDown } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineLink } from "react-icons/ai";
import { fetchPostInfo, UpdateComment } from "../../lib/Post.sanity";
import { fetchUser } from "../../lib/hooks/user.hook";
const style = {
  icon: "text-2xl cursor-pointer",
  title: "xl:text-4xl md:text-3xl break-words mt-3 text-2xl font-bold",
  largeCard:
    "flex-1 mt-3 flex-col sm:justify-center sm:flex-row max-w-[900px]  bg-[#ffffff] flex  shadow-xl p-3 rounded-xl  mx-auto ",
};

const PinDetails = () => {
  const router = useRouter();
  const { PinDetails: pinId }: any = router.query;

  const user: any = fetchUser();
  //! to keep track the comment
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const [post, setPost] = useState<any>(null);

  const fetchPost_details = async () => {
    const result = await fetchPostInfo(pinId);
    setPost(result);
  };
  useEffect(() => {
    fetchPost_details();
  }, [pinId]);

  //! to add comment
  const addComment = async () => {
    if (comment) {
      const res = await UpdateComment(pinId, comment, user?._id).then(() => {
        setComment("");
        fetchPost_details();
        router.reload();
      });
    }
  };
  return (
    post && (
      <div className="  h-screen w-full ">
        <Header  user={user} />
        {!post && <Spinner message="Preparing details" />}
        <div className={style.largeCard}>
          {/* pin image */}
          <div className="relative center md:block w-full ">
            <img
              src={post?.image?.url}
              className=" h-[700px] w-auto  object-cover rounded-xl"
              alt=""
            />
          </div>
          {/* pin details */}
          <div className=" flex flex-col w-full space-y-4 p-4">
            {/* Top session */}
            <TopSession />

            {/* middle session */}
            <MiddleSession post={post} />

            {/* Comments */}
            <div className="space-y-4">
              {/* top comment title */}
              <div className="flex space-x-3 items-center">
                <span className="text-2xl font-semibold ">Comments</span>
                <BsChevronDown className="text-2xl" />
              </div>

              {/* comments */}
              <div className="flex flex-col space-y-2">
                {post?.comment?.map((comment: any, index: number) => (
                  <div className="space-x-3 flex items-center" key={index}>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={comment?.comment_by?.profile_img}
                      alt=""
                    />
                    <span className="text-md font-bold">
                      {comment?.comment_by?.username}
                    </span>
                    <span className="text-sm">{comment?.comment}</span>
                  </div>
                ))}
              </div>
              {/* Add comment */}
              <div className="w-full p-2  border-2 outline-none  border-gray-300 rounded-lg flex">
                <input
                  type="text"
                  className="w-full outline-none  "
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <span
                  onClick={() => addComment()}
                  className="cursor-pointer hover:-rotate-45 text-xl  animate duration-200"
                >
                  😄
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PinDetails;

const TopSession = () => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex space-x-4 ">
        <BsThreeDots className={style.icon} />
        <AiOutlineArrowDown className={style.icon} />
        <AiOutlineLink className={style.icon} />
      </div>
      {/* save btn */}
      <div>
        <button className="bg-red-500 hover:bg-red-600 rounded-full px-4 p-2">
          <span className="text-2xl font-semibold text-white">Save</span>
        </button>
      </div>
    </div>
  );
};

const MiddleSession = ({ post }: any) => {
  const router = useRouter();
  return (
    <>
      <div className=" flex space-y-3 flex-col">
        <span className={style.title}>{post?.title}</span>
        {/* about */}
        <span className="text-gray-600">{post?.about}</span>
        {/* user */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center">
            <img
              onClick={() => {
                router.push(`/user/${post?.posted?._id}`);
              }}
              src={post?.posted?.profile_img}
              className="h-8 w-8 cursor-pointer rounded-full"
              alt=""
            />
            <span className="text-black font-medium">
              {post.posted?.username}
            </span>
          </div>
          {/* Follow btn */}
          <div>
            <button className="bg-gray-200  rounded-full animate hover:scale-110  px-4 py-3">
              Follow
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
