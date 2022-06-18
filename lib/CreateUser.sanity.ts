import { client } from "./sanityClient";

interface User {
  name: string;
  email: string;
  image: string;
}

export const createUser = async (user: User) => {
  const { name, email, image } = user;
  const userId = email.split("@")[0];
  const userData = {
    _type: "user",
    _id: userId,
    username: name,
    profile_img: image,
  };
  const result = await client.createIfNotExists(userData);
  return result;
};

export const fetchUsers = async (userId: { userId: string }) => {
  const query = `
   *[_type == "user" && _id=="${userId}"]{
    _id,
  username,
   profile_img
}
  `;
  const result = await client.fetch(query);

  return result;
};
