import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { createUser, fetchUsers } from "../lib/CreateUser.sanity";
import { fetchUser } from "../lib/hooks/user.hook";
import Category from "../components/category/Category";
import Feed from "../components/Feed/Feed";
import Spinner from "../lib/Spinner";
import { Search } from "../lib/Post.sanity";

const style = {
  wrapper: "h-screen overflow-hidden relative select-none w-full p-2",
  categoryContainer: " flex mt-4 w-full items-center space-x-3   ",
};
const Home: NextPage = () => {
  const router = useRouter(); //! router.
  //! session
  const { data, status } = useSession();

  //! to keep track the category
  const [category, setCategory] = useState<any>("All");

  //! to keep track the search query
  const [searchQuery, setSearchQuery] = useState<any>("");
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const user: any = data?.user;
      createUser(user);
    }
  }, [status]);
  const user: any = fetchUser();

  return (
    <div className={style.wrapper}>
      <Head>
        <title>Pinterest Clone</title>
        <link rel="icon" href="/pinterest_favicon_icon.png" />
      </Head>
      {/* header */}
      {user ? (
        <>
          <div className="z-50">
            <Header setSearchQuery={setSearchQuery} user={user} />
          </div>
          {/* Category */}

          <div className={style.categoryContainer}>
            <h1 className="font-bold text-xl hidden md:block md:text-2xl">
              Category
            </h1>
            <div className="flex w-full pl-[200px] md:pl-0 justify-evenly overflow-x-scroll">
              <Category
                setCategory={setCategory}
                setSearchQuery={setSearchQuery}
                current_category={category}
              />
            </div>
          </div>

          {/* Post */}
          <div className="h-screen overflow-hidden">
            <Feed user={user} searchQuery={searchQuery} />
          </div>

          {/* Create pin */}
          <div className="absolute center rounded-full shadow-xl border  bg-[#fffbfb]  right-3 h-[50px]  bottom-[50px] w-[50px]">
            <div className="hover:bg-[#e1e1e1] rounded-full  h-10 w-10 center">
              <button
                onClick={() => {
                  router.push("/createPost");
                }}
                className="text-black  text-3xl"
              >
                +
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full w-full center">{/* <Spinner /> */}</div>
      )}
    </div>
  );
};

export default Home;
