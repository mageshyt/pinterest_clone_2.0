import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./rightContainer.components";
import SearchBar from "./searchBar.components";
const styles = {
  wrapper: " flex w-full items-center justify-between gap-3 p-4 h-[80px] ",
};

interface Props {
  user: {
    profile_img: string | undefined | null;
    _id: string;
    name: string;
  };
}

const Header = ({ user }: Props) => {
  const profile_img = user?.profile_img;
  const _id = user?._id;

  return (
    <div className={styles.wrapper}>
      {/* left -logo today Home*/}
      <div className="relative items-center space-x-4 flex">
        {/* Logo */}
        <LeftContainer />
      </div>
      {/* middle */}
      <div className="flex-1  flex">
        <SearchBar />
      </div>
      {/* right */}
      <div>
        <RightContainer userImage={profile_img} UserId={_id} />
      </div>
    </div>
  );
};

export default Header;
