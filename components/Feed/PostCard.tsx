import React, { useEffect } from "react";
import { HiDownload } from "react-icons/hi";
import { AiOutlineLink, AiFillDelete } from "react-icons/ai";
import { deletePost, SavePost } from "../../lib/Post.sanity";
import PostedBY from "./PostedBY";
import { useRouter } from "next/router";
interface Props {
  item: {
    _id: string;
    image: {
      url: string;
    };
    postedBY: [any];
    author: any;
    destination: string;
    save: any;
    post_id: any;
  };

  userID: string;
}
const PostCard = ({ item, userID }: Props) => {
  const { _id, image, destination, author, postedBY, post_id } = item;

  const [postHover, setPostHover] = React.useState(false);
  //! to keep track the post is saved or not
  const [savePost, setSavePost] = React.useState(false);
  //! to check post is saved or not
  const isSaved = !!item?.save?.filter((post: any) => {
    return post?.userId == userID;
  }).length;

  const savePin = async (_id: string) => {
    if (!isSaved) {
      setSavePost(true);
    }
    const res = await SavePost(_id, userID);
    return res;
  };
  //! router
  const router = useRouter();
  return (
    <div className="w-[250px]  rounded-xl m-3">
      <div
        onMouseEnter={() => setPostHover(true)}
        onMouseLeave={() => setPostHover(false)}
        onClick={() => router.push(`/post/${_id || post_id}`)}
        className="cursor-zoom-in relative w-[250px] overflow-hidden hover:shadow-xl rounded-lg animate"
      >
        <img src={image?.url} alt="" className="w-[250px] h-full rounded-lg" />

        {postHover && (
          <div className="absolute top-0 flex w-full flex-col h-full justify-between overflow-hidden py-2 px-2 p-1 ">
            <div className="flex w-full  items-center justify-between">
              <div className="">
                {/* download */}
                <a
                  href={`${image?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex items-center justify-center bg-white rounded-full w-8 h-8"
                >
                  <HiDownload className="text-gray-600 text-xl" />
                </a>
              </div>
              {/* Save */}
              <div className="p-2 px-4 rounded-xl opacity-70 text-white font-semibold hover:opacity-100 cursor-pointer bg-red-400">
                {isSaved ? (
                  <>
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        savePin(_id);
                      }}
                    >
                      {savePost ? "saving..." : "save"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Destination */}
            <Destination
              destination={destination}
              author={author}
              userID={userID}
              deletePost={deletePost}
              _id={_id}
            />
          </div>
        )}
      </div>
      {/* PostedBY */}
      <div className="bg-white rounded-b-xl py-2">
        <PostedBY postedBY={postedBY} />
      </div>
    </div>
  );
};

export default PostCard;

function Destination({ destination, author, userID, deletePost, _id }: any) {
  return (
    <div>
      {destination && (
        <div className="flex justify-between items-center  w-full ">
          <a
            href={destination}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black gray-300 gap-2 items-center text-xl animate opacity-75 hover:opacity-100 bg-white p-1 rounded-xl flex"
          >
            <AiOutlineLink className="text-black text-xl" />
            {destination.slice(8, 17)}...
          </a>
          {/* Delete  only author can delete*/}
          {author == userID && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                deletePost(_id);
              }}
              className="bg-white h-8 w-8 rounded-full cursor-pointer center "
            >
              <AiFillDelete className="text-black text-xl" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
