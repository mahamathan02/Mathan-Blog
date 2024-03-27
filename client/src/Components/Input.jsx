import React from "react";

const Input = ({ type = "text", name, register, errors, label, fileType }) => {
  return (
    <div className="w-full h-full flex flex-col  px-8 py-2 mt-14 gap-4 ">
      <label className="flex font-medium h-6 gap-4 ">{label}</label>
      {errors[name]?.type === "required" && (
        <p className="w-full flex justify-end py-2 px-6 gap-4  text-red-700 size-4 ">
          *{name} is required
        </p>
      )}
      {type === "file" ? (
        <input
          className="flex  w-1/2 h-10  font-medium rounded-xl px-4 items-center  bg-slate-500 text-cyan-50 gap-4 outline-none border-none "
          type="file"
          accept={fileType}
          {...register(name, { required: true })}
        />
      ) : (
        <input
          className="flex w-1/2 h-10  font-medium rounded-xl px-4 items-center bg-slate-500 text-cyan-50 gap-4 outline-none border-none "
          type={type}
          {...register(name, { required: true })}
        />
      )}
    </div>
  );
};

export default Input;
