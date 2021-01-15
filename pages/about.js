import React from "react";
import ReactMarkdown from "react-markdown/with-html";

import { AvatarCard } from "components";

function About({ attributes, content }) {
  const { heading, tagline, team } = attributes;

  return (
    <div className="p-4 mx-auto max-w-lg text-center">
      <h2 className="text-2xl font-bold tracking-tighter title-font my-8 text-center lg:text-4xl">
        {heading}
      </h2>
      <p className="mb-8 text-base leading-relaxed text-center text-gray-700 lg:text-1xl">
        {tagline}
      </p>
      {team.map((instructor) => (
        <AvatarCard key={instructor.name} {...instructor} />
      ))}
      <ReactMarkdown allowDangerousHtml className="mt-10 prose lg:prose-xl">
        {content}
      </ReactMarkdown>
    </div>
  );
}

export async function getStaticProps() {
  const {
    default: { attributes, html },
  } = await import("content/about.md");

  return {
    props: {
      attributes,
      content: html,
    },
  };
}

export default About;
