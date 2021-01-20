import React from "react";
import Icon from "./Icon";

const Loader = () => (
  <div className="flex flex-col w-screen h-screen min-h-full justify-center items-center">
    <Icon name="spinner" style="animate-spin w-12 h-12 text-blue-400" />
  </div>
);

export default Loader;
