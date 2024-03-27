import React from "react";
import { Input, UploadImagefile } from "../Components/index";
import { useForm } from "react-hook-form";

const MainBlogForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full h-full flex px-2 py-4  flex-col ">
      <form
        className="  border-2 border-black rounded w-full flex-col h-full "
        onSubmit={handleSubmit(onsubmit)}
      >
        <Input
          label={"Title : -"}
          name={"Title"}
          register={register}
          errors={errors}
        />

        <Input
          label={"Short Description here : -"}
          name={"Short Description"}
          register={register}
          errors={errors}
        />

        <Input
          label={"Long Description here : -"}
          name={"Short Description"}
          register={register}
          errors={errors}
        />

        <UploadImagefile
          register={register}
          errors={errors}
          image={"image_uri"}
          label={"Upload the image : -"}
          fileType={"image/*"}
        />

        <div className="flex w-full mb-6  px-9  justify-between ">
          <button
            className="bg-green-600 px-6 py-2 text-white font-semibold rounded-md"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-red-700 px-6 py-2 text-white font-semibold rounded-md"
            type="submit"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainBlogForm;
