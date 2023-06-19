import React from "react";

function HalfStar({classname}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={!classname ? "24" : ""}
      height={!classname ? "24" : ""}
      fill="#FFCC31"
      viewBox="0 0 24 24"
      className={classname}
    >
      <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27L12 17.178V5.173zm0-4.586L8.332 8.155 0 9.306l6.064 5.828-1.48 8.279L12 19.446l7.416 3.966-1.48-8.279L24 9.306l-8.332-1.15L12 .587z"></path>
    </svg>
  );
}

export default HalfStar;