import { client } from "./sanityClient";

export const fetchPost = async () => {
  const query = `
    *[_type == "post"] | order(_createdAt desc) {
  "image":image.asset->{
      url
    
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        PostedBY->{
          _id,
          username,
          profile_img
        },
        userId,
         
      },
    } `;
  const result = await client.fetch(query);

  return result;
};

export const SavePost = async (postId: string, userID: string) => {
  client
    .patch(postId)
    .setIfMissing({
      save: [],
    })
    .insert("after", "save[-1]", [
      {
        _key: "save-" + new Date().getTime(),

        userId: userID,
      },
    ])
    .commit()
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};
