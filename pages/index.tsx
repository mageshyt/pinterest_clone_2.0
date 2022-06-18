import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { createUser, fetchUsers } from "../lib/CreateUser.sanity";

import Category from "../components/category/Category";
import Feed from "../components/Feed/Feed";

const style = {
  wrapper: "h-screen select-none  w-full p-2",
  categoryContainer: " flex mt-4 w-full items-center space-x-3   ",
};
const Home: NextPage = () => {
  const router = useRouter(); //! router.
  //! session
  const { data, status } = useSession();
  // ! to keep track the user
  const [user, setUser] = useState<any>(null);
  //! to keep track the category
  const [category, setCategory] = useState<any>("All");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const user: any = data?.user;
      createUser(user);
    }
  }, [status]);

  //! fetch user
  useEffect(() => {
    const fetch = async () => {
      if (status === "authenticated") {
        const { email }: any = data?.user;
        const userId = email.split("@")[0];
        const result = await fetchUsers(userId);
        setUser(result[0]);
      }
    };
    fetch();
  }, [status]);
  return (
    <div className={style.wrapper}>
      <Head>
        <title>Pinterest Clone</title>
        <link rel="icon" href="/pinterest_favicon_icon.png" />
      </Head>
      {/* header */}
      <Header user={user} />
      {/* Category */}
      <div className={style.categoryContainer}>
        <h1 className="font-bold text-xl hidden md:block md:text-2xl">
          Category
        </h1>
        <div className="flex w-full pl-[200px] md:pl-0 justify-evenly overflow-x-scroll">
          <Category setCategory={setCategory} current_category={category} />
        </div>
      </div>

      {/* Post */}
      <div>
        <Feed user={user} />
      </div>
    </div>
  );
};

export default Home;
