import React from "react";
import Link from "next/link";
import { useAuth } from "components";
import fs from "fs";
import path from "path";

function LessonIndex({ lessons }) {
  const { user } = useAuth();

  if (!lessons || !lessons.length) {
    return <p>No lessons found!</p>;
  }

  return (
    <>
      <p>List of lessons:</p>
      <ul>
        {lessons.map(({ filename, attributes }) => (
          <li key={filename}>
            <Link href={`/lessons/${filename}`}>
              <a>{attributes.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const lessonsDirectory = path.join(process.cwd(), "content/lessons");
  const filenames = fs.readdirSync(lessonsDirectory);

  const lessons = await Promise.all(
    filenames.map(async (filename) => {
      const {
        default: { attributes },
      } = await import(`content/lessons/${filename}`);

      return {
        filename: filename.split(".")[0],
        attributes,
      };
    })
  );

  return {
    props: {
      lessons,
    },
  };
}

export default LessonIndex;
