import React from "react";

const QuestionCard = ({
  question_id,
  question_text,
  answer_options,
  response,
  register,
}) => {
  console.log("response? ", response);

  return (
    <div className="py-8 px-4 shadow-md rounded-md">
      <p className="text-xs font-medium tracking-widest text-blue-500 title-font mt-4 mb-1">
        Question
      </p>
      <p className="text-xl font-bold tracking-tighter text-blue-800 lg:text-2xl">
        {question_text}
      </p>
      {answer_options.map((a) => (
        <label key={a.answer} className="flex items-center mt-3">
          {response ? (
            <input
              type="checkbox"
              name={question_id}
              checked={response.answer.includes(a.answer)}
              disabled
              className="rounded text-blue-400"
            />
          ) : (
            <input
              type="checkbox"
              name={question_id}
              value={JSON.stringify(a)}
              className="rounded text-blue-400"
              ref={register}
            />
          )}
          <span className="ml-2 text-gray-700">
            {a.answer} {response ? `(${a.score} points)` : null}
          </span>
        </label>
      ))}
      {response ? (
        <p className="pt-8 text-blue-600">
          You earned {response.score} out of {response.max_score} possible
          points
        </p>
      ) : null}
    </div>
  );
};

export default QuestionCard;
