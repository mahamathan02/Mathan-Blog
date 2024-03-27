import React from "react";
import { MdCloudUpload } from "react-icons/md";

const UploadImagefile = ({
  type = "text",
  image,
  register,
  errors,
  label,
  fileType,
}) => {
  return (
    // <div className="w-full h-full flex flex-col bg-slate-950 ">
    //   <div className="flex flex-col items-center justify-center gap-3">
    //     <MdCloudUpload className="text-4xl text-cyan-600 gap-3 " />
    //     <p className="text-lg font-semibold text-cyan-600 gap-3">
    //       Click here to upload
    //     </p>
    //   </div>
    //   <input type="file" accept={} />
    // </div>

    <div className="flex items-center justify-center w-full h-full flex-col">
      <label className="flex w-full px-8  font-medium ">{label}</label>
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-950 ">
        <div className="flex flex-col items-center  gap-3">
          <MdCloudUpload className="text-4xl text-cyan-600 gap-3 " />
          <p className="text-lg font-semibold text-cyan-600 gap-3">
            Click here to upload
          </p>
        </div>
        <input
          type="file"
          // className="w-0 h-0"
          accept={fileType}
          {...register(image, { required: true })}
        />
      </div>
      {errors[image]?.type === "required" && (
        <p className="text-red-800 capitalize whitespace-nowrap" role="alert">
          *{image} is required
        </p>
      )}
    </div>
  );
};

export default UploadImagefile;
