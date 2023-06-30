import React from "react";

export const CustomLoader = ({message}) => {
  return (
    <div className="w-full h-full bg-main flex items-center flex-col justify-items-center justify-center absolute left-0 z-[10]">
      <p className="text-4xl text-white font-bold">
        {message}
      </p>
      <span className="loader"></span>
    </div>
  );
};
