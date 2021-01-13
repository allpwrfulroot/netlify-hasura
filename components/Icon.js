import React from "react";
import icons from "./icons.json";

const Icon = ({ name, color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    stroke={color || "currentColor"}
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
