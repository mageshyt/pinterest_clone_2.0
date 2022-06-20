import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { categories } from "../../assets/data";
import { useForm, SubmitHandler } from "react-hook-form";
import { UploadPost } from "../../lib/hooks/post.hook";
import { useRouter } from "next/router";
interface FormData {
  title: string;
  destination: string;
  category: string;
  about: string;
}

const PostForm = ({ user, imageAsset, userId }: any) => {
  //! to keep track the title and destination, and image
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const onSubmitForm = handleSubmit(async (data) => {
    const { title, destination, category, about } = data;
    const newPost = {
      title,
      destination,
      category,
      about,
    };
    const load = toast.loading("Please wait...");
    setLoading(true);
    UploadPost(newPost, imageAsset, userId).then(() => {
      toast.update(load, {
        render: "Successfully uploaded",
        type: "success",
        autoClose: 2000,
        isLoading: false,
      });
      setTimeout(() => {
        router.push("/");
      }, 2200);
    });
  });
  return (
    <div className="p-4 h-full w-full">
      <ToastContainer />
      <form onSubmit={onSubmitForm} className=" flex flex-col space-y-3">
        <label>
          <input
            {...register("title", { required: true })}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none text-xl w-full sm:text-2xl font-bold border-b-2 border-gray-200 p-2"
            placeholder="Title"
          />
        </label>
        {/* user info */}
        <div className="flex items-center space-x-3">
          <img
            src={user?.profile_img}
            className="h-9 w-9 rounded-full"
            alt=""
          />
          <p className="text-gray-600 text-lg font-medium">{user?.username}</p>
        </div>
        {/* About */}
        <label>
          <input
            {...register("about", { required: true })}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="outline-none  w-full font-medium border-b-2 border-gray-200 p-2"
            placeholder="Tell me about your post"
          />
        </label>
        {/* destination */}
        <label>
          <input
            {...register("destination", { required: true })}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="outline-none  w-full font-medium border-b-2 border-gray-200 p-2"
            placeholder="Add a destination Link"
          />
        </label>

        {/* Category */}
        <label>
          <span>Chose the Category</span>

          {/* list  */}
          <select
            {...register("category", { required: true })}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none mt-3 text-sm w-full font-medium border-b-2 border-gray-200 p-2"
          >
            <option className="sm:text-sm bg-white" value="others">
              Select a Category
            </option>
            {categories.map((category: any, index: number) => {
              return (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </label>
        {/* Missing field show error*/}
        {errors.title ||
        errors.destination ||
        errors.about ||
        errors.category ? (
          <span className="text-red-600 text-sm font-medium">
            Please fill all the fields
          </span>
        ) : null}
        {/* submit */}
        <button
          disabled={loading}
          type="submit"
          className={
            loading
              ? "bg-blue-500 hover:bg-blue-600 rounded-full px-4 p-2 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 rounded-full px-4 p-2 "
          }
        >
          <span className="text-2xl font-semibold text-white">Post</span>
        </button>
      </form>
    </div>
  );
};

export default PostForm;
