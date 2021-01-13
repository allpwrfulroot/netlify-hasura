import React from "react";
import Icon from "./Icon";

const FeatureCard = ({ title, subtitle, description, icon }) => {
  return (
    <div className="py-8 px-4 shadow-md rounded-md">
      <Icon name={icon} size={24} />
      <p className="text-xs font-medium tracking-widest text-blue-500 title-font mt-4 mb-1">
        {subtitle}
      </p>
      <p className="text-xl font-bold tracking-tighter text-blue-800 lg:text-2xl">
        {title}
      </p>
      <p className="text-base pt-4">{description}</p>
    </div>
  );
};

export default FeatureCard;
