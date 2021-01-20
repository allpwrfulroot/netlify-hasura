import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

import { useAuth } from "lib";
import { QuestionCard } from "components";

const UPSERT_RESPONSES = gql`
  mutation UpsertResponse($objects: [responses_insert_input!]!) {
    insert_responses(
      objects: $objects
      on_conflict: {
        constraint: responses_pkey
        update_columns: [answer, max_score, score]
      }
    ) {
      affected_rows
    }
  }
`;

const GET_RESPONSES = gql`
  query GetUserLessonResponses($id: String!, $lesson_id: Int!) {
    users_by_pk(id: $id) {
      responses(where: { lesson_id: { _eq: $lesson_id } }) {
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

function Lesson({ attributes, content }) {
  const {
    title,
    lesson_id,
    subtitle,
    instructor,
    date,
    questions,
  } = attributes;
  const [getResponses, { data: responseData, refetch }] = useLazyQuery(
    GET_RESPONSES
  );
  const responses = responseData?.users_by_pk?.responses || [];
  const [addResponses, { error: resultError, data: resultData }] = useMutation(
    UPSERT_RESPONSES
  );
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  React.useEffect(() => {
    // Temporary workaround while useQuery's 'skip' option gets fixed
    if (user && user.id) {
      console.log("fetch!");
      getResponses({
        variables: {
          id: user.id,
          lesson_id: lesson_id,
        },
      });
    }
  }, [user]);

  console.log("responses? ", responseData);
  console.log("questions? ", questions);

  const onSubmit = (data) => {
    console.log("data: ", data);
    const newResponses = Object.keys(data).map((i) => {
      const parsed = data[i].map((o) => JSON.parse(o));
      const answer = parsed.map((o) => o.answer);
      const score = parsed.reduce(
        (acc, cur) => acc + parseInt(cur.score || "0"),
        0
      );
      const max_score = questions
        .find((q) => q.question_id === i)
        .answer_options.reduce((acc, cur) => {
          const amnt = parseInt(cur.score || "0");
          return amnt > 0 ? amnt + acc : acc;
        }, 0);
      return {
        question_id: i,
        lesson_id,
        answer: `{${answer.join(",")}}`,
        score,
        max_score,
      };
    });
    console.log("responses: ", newResponses);
    addResponses({ variables: { objects: newResponses } });
    setTimeout(() => refetch(), 500);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-4 mx-auto max-w-max"
    >
      <div>
        <p className="text-xs font-medium tracking-widest text-blue-500 title-font">
          {subtitle}
        </p>
        <p className="text-xl font-bold tracking-tighter text-blue-800 lg:text-2xl">
          {title}
        </p>
        <p className="text-base pt-4">
          {instructor}, {date}
        </p>
      </div>

      <article>
        <ReactMarkdown allowDangerousHtml className="mt-10 prose lg:prose-xl">
          {content}
        </ReactMarkdown>
      </article>
      {questions.map((q) => (
        <QuestionCard
          {...q}
          key={q.question_id}
          response={responses.find((r) => r.question_id === q.question_id)}
          register={register}
        />
      ))}
      {responses.length ? null : (
        <button
          type="submit"
          className=" px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Submit
        </button>
      )}
    </form>
  );
}

export async function getStaticProps({ params }) {
  const { lessonSlug } = params;
  const {
    default: { attributes, html },
  } = await import(`content/lessons/${lessonSlug}.md`);

  return {
    props: {
      attributes,
      content: html,
    },
  };
}

export async function getStaticPaths() {
  const fs = require("fs");
  const path = require("path");
  const lessonsDirectory = path.join(process.cwd(), "content/lessons");
  const filenames = fs
    .readdirSync(lessonsDirectory)
    .map((f) => ({ params: { lessonSlug: f.split(".")[0] } }));

  return {
    paths: filenames,
    fallback: false,
  };
}

export default Lesson;
