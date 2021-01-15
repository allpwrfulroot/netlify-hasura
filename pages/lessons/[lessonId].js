import React from "react";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";

import { QuestionCard } from "components";

// const SUBMIT_ANSWER = `
//   mutation SubmitAnswer($student_id: ) {
//     generateChatConversationWith(chatWithUserId: "${userId}") {
//       id
//     }
//   }
// `;

function Lesson({ attributes }) {
  const { title, subtitle, instructor, date, content, questions } = attributes;
  const q_ids = questions.map((q) => q.question_id);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const sum = Object.values(data).reduce(
      (acc, curr) => parseInt(curr || "0") + acc,
      0
    );
    console.log("sum: ", sum);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 mx-auto max-w-max">
      <p className="text-xs font-medium tracking-widest text-blue-500 title-font mt-4 mb-1">
        {subtitle}
      </p>
      <p className="text-xl font-bold tracking-tighter text-blue-800 lg:text-2xl">
        {title}
      </p>
      <p className="text-base pt-4">
        {instructor}, {date}
      </p>
      <article className="mt-10 prose lg:prose-xl">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
      {questions.map((q) => (
        <QuestionCard {...q} register={register} />
      ))}
      <button type="submit">Submit</button>
    </form>
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
