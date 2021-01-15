import React from "react";

const QuestionCard = ({
  question_id,
  question_text,
  answer_options,
  register,
}) => {
  return (
    <div className="py-8 px-4 shadow-md rounded-md">
      <p className="text-xs font-medium tracking-widest text-blue-500 title-font mt-4 mb-1">
        Question
      </p>
      <p className="text-xl font-bold tracking-tighter text-blue-800 lg:text-2xl">
        {question_text}
      </p>
      {answer_options.map((a) => (
        <label class="flex items-center mt-3">
          <input
            type="checkbox"
            name={a.answer}
            value={a.score}
            className="rounded text-blue-400"
            ref={register}
          />
          <span class="ml-2 text-gray-700">{a.answer}</span>
        </label>
      ))}
    </div>
  );
};

export default QuestionCard;
