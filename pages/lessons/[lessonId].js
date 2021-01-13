import React from "react";

function Lesson({ attributes }) {
  if (!attributes) {
    return <p>Attributes not found</p>;
  }

  return (
    <>
      <p>{attributes.title}</p>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { lessonId } = params;
  const {
    default: { attributes },
  } = await import(`content/lessons/${lessonId}.md`);

  return {
    props: {
      attributes,
    },
  };
}

export async function getStaticPaths() {
  const fs = require("fs");
  const path = require("path");
  const lessonsDirectory = path.join(process.cwd(), "content/lessons");
  const filenames = fs
    .readdirSync(lessonsDirectory)
    .map((f) => ({ params: { lessonId: f.split(".")[0] } }));

  return {
    paths: filenames,
    fallback: false,
  };
}

export default Lesson;
