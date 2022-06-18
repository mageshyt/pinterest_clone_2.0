import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./rightContainer.components";
import SearchBar from "./searchBar.components";
const styles = {
  wrapper: " flex w-full items-center justify-between gap-3 p-4 h-[80px] ",
};
const Header = () => {
  const { data: session } = useSession();
  const userImage = session?.user?.image;
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
        <RightContainer userImage={userImage} />
      </div>
    </div>
  );
};

export default Header;
