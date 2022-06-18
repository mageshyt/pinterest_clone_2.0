import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header/Header";

const Home: NextPage = () => {
  const router = useRouter();
  const data = useSession();

  useEffect(() => {
    if (data.status === "unauthenticated") {
      router.push("/login");
    }
  }, [data.status]);

  return (
    <div className="h-screen select-none p-2">
      <Head>
        <title>Pinterest Clone</title>
        <link rel="icon" href="/pinterest_favicon_icon.png" />
      </Head>
      {/* header */}
      <Header />
    </div>
  );
};

export default Home;
