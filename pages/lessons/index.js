import React from "react";
import Link from "next/link";
import { useAuth } from "lib";
import { gql, useLazyQuery } from "@apollo/client";
import fs from "fs";
import path from "path";

import { LessonCard } from "components";

const GET_USER = gql`
  query GetUser($id: String!) {
    users_by_pk(id: $id) {
      id
      email
      name
      created_at
      responses {
        created_at
        updated_at
        answer
        score
        max_score
        question_id
        lesson_id
      }
    }
  }
`;

function LessonIndex({ lessons }) {
  const { user } = useAuth();
  const [getUser, { error, loading, data }] = useLazyQuery(GET_USER);

  React.useEffect(() => {
    // Temporary workaround while useQuery's 'skip' option gets fixed
    if (user && user.id) {
      console.log("fetch!");
      getUser({
        variables: {
          id: user.id,
        },
      });
    }
  }, [user]);

  console.log("data: ", data);

  return (
    <div className="p-4 mx-auto max-w-lg">
      <span className="block text-xs text-center font-medium tracking-widest text-blue-500 title-font mt-4 mb-1">
        Welcome,{" "}
        {user?.user_metadata?.full_name
          ? user.user_metadata.full_name
          : "new student!"}
      </span>
      <h2 className="text-2xl text-center font-bold tracking-tighter title-font my-8 text-center lg:text-4xl">
        List of lessons
      </h2>
      {lessons.map(({ lessonSlug, attributes, points }) => (
        <LessonCard
          key={lessonSlug}
          {...attributes}
          lessonSlug={lessonSlug}
          total_points={points}
        />
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
      const points = attributes?.questions?.length
        ? attributes.questions.reduce((acc, cur) => {
            console.log("cur: ", cur);
            return cur.answer_options.reduce((accx, curx) => {
              const the_score = parseInt(curx.score);
              return the_score > 0 ? the_score + accx : accx;
            }, 0);
          }, 0)
        : null;
      console.log("points? ", points);

      return {
        lessonSlug: filename.split(".")[0],
        attributes,
        points,
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
