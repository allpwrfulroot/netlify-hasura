import React from "react";
import Link from "next/link";
import { useAuth } from "components";
import fs from "fs";
import path from "path";

import { LessonCard } from "components";

const GET_USER = `
  query GetUser($id: String!) {
    users_by_pk(id: $id) {
      id
      email
      name
      created_at
      responses {
        created_at
        id
        answer
        possible_score
        question_id
        score
        updated_at
      }
    }
  }
`;

function LessonIndex({ lessons }) {
  const { user } = useAuth();

  React.useEffect(() => {
    async function getUserData() {
      try {
        const userRes = await fetch(
          "https://netlify-cms-demo.hasura.app/v1/graphql",
          {
            method: "POST",
            body: JSON.stringify({
              query: GET_USER,
              variables: {
                id: user.id,
              },
            }),
            headers: {
              "content-type": "application/json",
              authentication: `Bearer ${user.token}`,
            },
          }
        );
        const userData = await userRes.json();
        console.log("received: ", userData);
      } catch (err) {
        console.log("err in getUserData: ", err);
      }
    }
    getUserData();
  }, [user]);

  if (!lessons || !lessons.length) {
    return <p>No lessons found!</p>;
  }

  return (
    <div className="p-4 mx-auto max-w-lg">
      <h2 className="text-2xl text-center font-bold tracking-tighter title-font my-8 text-center lg:text-4xl">
        List of lessons
      </h2>
      {lessons.map(({ filename, attributes }) => (
        <LessonCard key={filename} {...attributes} lessonId={filename} />
      ))}
    </div>
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
