import React from "react";
import Masonry from "react-masonry-css";
import PostCard from "../components/Feed/PostCard";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ posts, userId }) => (
  <Masonry
    className="flex animate-slide-fwd "
    breakpointCols={breakpointColumnsObj}
    columnClassName="my-masonry-grid_column"
  >
    {posts.map((item, index) => {
      return (
        <PostCard item={item} userID={userId} key={index} className="w-max" />
      );
    })}
  </Masonry>
);

export default MasonryLayout;
