import React from "react";

const Hero = ({ heading, subheading, cta, hero }) => {
  return (
    <section className="text-gray-700 body-font my-10 mx-4 md:container md:mx-auto xl:max-w-screen-lg">
      <div className="flex flex-col items-center md:flex-row md:px-8">
        <div className="flex flex-col items-center my-10 w-full text-left md:w-1/2 md:items-start md:text-left lg:flex-grow lg:text-center">
          <h2 className="mb-1 text-xs font-medium tracking-widest text-blue-500 title-font">
            {subheading}
          </h2>
          <h1 className="mb-8 text-2xl font-bold tracking-tighter text-center text-blue-800 lg:text-left lg:text-5xl title-font">
            {heading}
          </h1>
          <p className="mb-8 text-base leading-relaxed text-center text-gray-700 lg:text-left lg:text-1xl">
            Create and share an online course
          </p>
          <div className="flex justify-center">
            <a
              href="#"
              className="inline-flex items-center font-semibold text-blue-700 md:mb-2 lg:mb-0 hover:text-blue-400 "
            >
              {cta}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="mb-12 md:mb-0 md:w-1/2 lg:max-w-lg lg:w-full">
          <img
            className="object-cover object-center rounded-lg "
            alt="hero"
            src={hero || "https://dummyimage.com/720x600/F3F4F7/8693ac"}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
