import React from "react";

function StarFill({classname}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"

      className={classname}
      viewBox="0 0 24 24"
      fill="#FFCC31"
    >
      <path d="M12 .587l3.668 7.568L24 9.306l-6.064 5.828 1.48 8.279L12 19.446l-7.417 3.967 1.481-8.279L0 9.306l8.332-1.151z"></path>
    </svg>
  );
}

export default StarFill;
