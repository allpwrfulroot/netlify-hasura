import React from "react";

const AvatarCard = ({ name, title, office, photo }) => {
  return (
    <div className="py-8 px-4 shadow-md rounded-md">
      <p className="text-xs font-medium tracking-widest text-blue-500 title-font mt-4 mb-1">
        {office}
      </p>
      <p className="text-xl font-bold tracking-tighter text-blue-800 lg:text-2xl">
        {name}
      </p>
      <img
        className="inline-block border rounded-full m-4"
        src={photo}
        alt={`${name} profile photo`}
        width={200}
      />
      <p className="text-base pt-4">{title}</p>
    </div>
  );
};

export default AvatarCard;
