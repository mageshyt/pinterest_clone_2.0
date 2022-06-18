import Image from "next/image";
import React from "react";
const styles = {
  button:
    "bg-black p-4 text-white text-lg select-none font-bold mx-2 rounded-2xl cursor-pointer ",
  logo: "hover:bg-gray-300 transform transition-all duration-105 cursor-pointer p-2 rounded-full flex items-center ",
};
const LeftContainer = () => {
  const [status, setStatus] = React.useState("home");
  return (
    <>
      <div className={styles.logo}>
        <Image
          height={30}
          width={30}
          src="/pinterest_favicon_icon.png"
          alt="logo"
          objectFit="contain"
        />
      </div>

      {/* Home */}
      <div className="hidden lg:inline-block space-x-2">
        <span
          className={
            status === "home"
              ? styles.button + "bg-black"
              : "text-black cursor-pointer text-lg text-bold"
          }
          onClick={() => setStatus("home")}
        >
          Home
        </span>
        <span
          onClick={() => setStatus("today")}
          className={
            status === "today"
              ? styles.button + "bg-black"
              : "text-black cursor-pointer text-lg text-bold"
          }
        >
          Today
        </span>
      </div>
    </>
  );
};

export default LeftContainer;
