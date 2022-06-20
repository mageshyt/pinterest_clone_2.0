import { client } from "./sanityClient";

//! to fetch all post
export const fetchPost = async () => {
  const query = `
    *[_type == "post" ] | order(_createdAt desc) {
  "image":image.asset->{
      url
    
  },
      _id,
      destination,
      "postedBY":author->{
       _id,
          username,
          profile_img
      },
      "author":author._ref,
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
  const filter_result = result.filter((item: any) => {
    return !item._id.includes("drafts");
  });

  return filter_result;
};
//! to save post
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

export const deletePost = async (postId: string) => {
  const result = await client
    .delete(postId)
    .then((res) => {
      console.log("deleted");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

//! to fetch the post info

export const fetchPostInfo = async (postId: string) => {
  const query = `
 *[_type == 'post' && _id=="${postId}"] {
     category,
      destination,
      about,
      title,
   "image":image.asset->{
      url
  },
  _id,
 "posted": author->{
       _id,
          username,
          profile_img
      },
      category,
      destination,
      about,
      title,
comment[]{
      comment,
      _key,
    comment_by->{
  username,
  profile_img
},
    }
  } 
  `;
  const result = await client.fetch(query);

  return result[0];
};

export const UpdateComment = async (
  pinId: string,
  comment: string,
  userId: string
) => {
  const res = await client
    .patch(pinId)
    .setIfMissing({ comment: [] })
    .insert("after", "comment[-1]", [
      {
        comment,
        _key: "comment-" + new Date().getTime(),
        comment_by: { _type: "postedBy", _ref: userId },
      },
    ])
    .commit();
  console.log(res);
  return res;
};

export const Search = async (search: string) => {
  const query = `*[_type == "pin" && title match '${search}*' || category match '${search}*' || about match '${search}*']{
          category,
      destination,
      about,
      title,
   "image":image.asset->{
      url
  },
  _id,
 "postedBY": author->{
       _id,
          username,
          profile_img
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
      category,
      destination,
      about,
      title,
comment[]{
      comment,
      _key,
    comment_by->{
  username,
  profile_img
  },


    }

          }`;
  const result = await client.fetch(query);
  const filter_result = result.filter((item: any) => {
    return !item?._id.includes("drafts");
  });
  return filter_result;
};
