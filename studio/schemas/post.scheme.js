export const pin_post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      required: true,
    },

    {
      name: "about",
      title: "About",
      type: "text",
    },
    // ! post Description
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    // !post image
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    // ! post category
    {
      name: "category",
      title: "Category",
      type: "string",
      required: true,
    },
    //! author
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "user" }],
    },

    //! save post
    {
      name: "save",
      title: "Save",
      type: "array",
      of: [{ type: "save" }],
    },
    //! comment
    {
      name: "comment",
      title: "Comment",
      type: "array",

      of: [{ type: "comment" }],
    },
  ],
};
