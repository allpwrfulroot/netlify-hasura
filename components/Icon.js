import React from "react";
import icons from "./icons.json";

const Icon = ({ name, color, style = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke={color || "currentColor"}
    className={style}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d={icons[name]}
    />
  </svg>
);

export default Icon;
