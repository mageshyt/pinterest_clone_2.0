export const user = {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string",
      required: true,
    },
    {
      name: "profile_img",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
