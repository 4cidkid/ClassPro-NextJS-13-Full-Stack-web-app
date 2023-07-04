import React from "react";

function Check({ classname }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classname || ""}
      viewBox="0 0 24 24"
      fill="#23c501"
    >
      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z"></path>
    </svg>
  );
}

export default Check;
