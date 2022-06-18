import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { fetchUsers } from "../../lib/CreateUser.sanity";

const UserId = () => {
  const router = useRouter();
  const { userId }: any = router.query;
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchUsers(userId);
      setUser(result[0]);
    };
    fetch();
  }, []);
  return <div>UserId</div>;
};

export default UserId;
