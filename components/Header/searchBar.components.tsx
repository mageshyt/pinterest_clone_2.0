import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const styles = {};
const SearchBar = () => {
  return (
    <div className="bg-[#EFEFEF]  select-none flex items-center p-1 w-full hover:bg-[#e1e1e1e1] rounded-lg h-[60px]">
      <AiOutlineSearch className="text-2xl ml-2" />
      <div>
        <input
          className="w-full h-full outline-none p-4 bg-transparent text-back text-lg"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
