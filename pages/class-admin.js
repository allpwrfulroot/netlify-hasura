import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_RESPONSES = gql`
  query GetClassResponses {
    users {
      email
      id
      name
      created_at
      responses(order_by: { lesson_id: asc }) {
        score
        question_id
        max_score
        lesson_id
        created_at
        answer
        updated_at
      }
    }
    responses(distinct_on: question_id) {
      max_score
      lesson_id
      question_id
    }
  }
`;

function ClassAdmin() {
  const { error, loading, data } = useQuery(GET_RESPONSES);
  console.log("loading: ", loading);
  console.log("error: ", error);
  console.log("data: ", data);
  if (loading || !data) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-4 mx-auto max-w-screen-md text-center">
      <h2 className="text-2xl font-bold tracking-tighter title-font my-8 text-center lg:text-4xl">
        How are students doing?
      </h2>
      <p className="mb-8 text-base leading-relaxed text-center text-gray-700 lg:text-1xl">
        Student progress
      </p>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th>Student (email)</th>
            {data.responses.map((r) => (
              <th>
                {r.question_id} ({r.max_score})
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 divide-solid">
          {data.users.map(({ email, responses = [] }) => (
            <tr>
              <td className="text-left p-2">{email}</td>
              {data.responses.map((r) => {
                const res = responses.find(
                  (a) => a.question_id === r.question_id
                );
                return <td className="p-2">{res ? res.score : "--"}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassAdmin;
