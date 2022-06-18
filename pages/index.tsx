import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const data = useSession();

  useEffect(() => {
    if (data.status === "unauthenticated") {
      router.push("/login");
    }
  }, [data.status]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Pinterest Clone</title>
        <link rel="icon" href="/pinterest_favicon_icon.png" />
      </Head>

      <h1>Home</h1>

      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
