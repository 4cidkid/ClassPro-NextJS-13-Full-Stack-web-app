
import React, { useEffect, useState } from "react";
import Link from "next/link";
export const Button = ({ link, children }) => {
  return (
    <Link
      href={link}
      className="bg-main text-white px-5 py-2 rounded-lg w-fit font-bold flex w-fit"
    >
      {children}
    </Link>
  );
};
export default Button;
