import React, { useEffect } from "react";
import { categories } from "../../assets/data";
import { Search } from "../../lib/Post.sanity";

interface Props {
  current_category: string;
  setCategory: (category: string) => void;
  setPost: (post: any) => void;
  category: string;
}

const style = {
  text: "text-gray-500 hover:text-purple-500 cursor-pointer text-md font-semibold",
};
const Category = ({
  setCategory,
  current_category,
  setPost,
  category,
}: Props) => {
  useEffect(() => {
    const fetch = async () => {
      if (category !== "All") {
        const category_post = await Search(category);
        setPost(category_post);
      }
    };
    fetch();
  }, [category]);
  return (
    <>
      {categories.map((item: any, index: number) => {
        const { name, id } = item;
        return (
          <div
            key={index}
            onClick={() => {
              setCategory(name);
            }}
            className=" hover:bg-gray-300 animate   p-2 rounded-xl"
          >
            <h2
              className={
                current_category === name
                  ? `text-purple-500 text-lg ${style.text}`
                  : style.text
              }
            >
              {name}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export default Category;
