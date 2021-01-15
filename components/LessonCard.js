import React from "react";
import Link from "next/link";

const LessonCard = ({ title, subtitle, instructor, date, lessonId }) => {
  return (
    <Link href={`/lessons/${lessonId}`}>
      <div as="a" className="py-8 px-4 shadow-md rounded-md">
        <p className="text-xs font-medium tracking-widest text-blue-500 title-font mt-4 mb-1">
          {subtitle}
        </p>
        <p className="text-xl font-bold tracking-tighter text-blue-800 lg:text-2xl">
          {title}
        </p>
        <p className="text-base pt-4">
          {instructor}, {date}
        </p>
      </div>
    </Link>
  );
};

export default LessonCard;
