import React, { useEffect } from "react";

export const Loader = (props) => {
  useEffect(() => {
    if (!props.show) {
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.height = "fit-content";
      document.body.style.overflowY = "";
    }
  }, [props.show]);
  return (
    <div className="loader-container z-[10]">
      <p className="text-4xl text-white font-bold">
        Loading Your Awesome Tutors!
      </p>
      <span className="loader"></span>
    </div>
  );
};
