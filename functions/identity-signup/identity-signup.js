// note - this function MUST be named `identity-signup` to work
// we do not yet offer local emulation of this functionality in Netlify Dev
//
// more:
// https://www.netlify.com/blog/2019/02/21/the-role-of-roles-and-how-to-set-them-in-netlify-identity/
// https://www.netlify.com/docs/functions/#identity-and-functions
const fetch = require("node-fetch");

const handler = async function (event) {
  const { user } = JSON.parse(event.body);
  console.log("user? ", user);

  const responseBodyString = JSON.stringify({
    query: `
    mutation insertUser($id: String, $email: String, $name: String){
      insert_users_one(
        object: {id: $id, email: $email, name: $name },
        on_conflict: { constraint: users_pkey, update_columns: [email, name] }
      ) {
        id
      }
    }    
  `,
    variables: {
      id: user.id,
      email: user.email,
      name: user.user_metadata.full_name,
    },
  });

  console.log(responseBodyString);

  const result = await fetch(process.env.HASURA_URL, {
    method: "POST",
    body: responseBodyString,
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.HASURA_SECRET,
    },
  });
  const { errors, data } = await result.json();

  if (errors) {
    console.log(errors);
    return {
      statusCode: 500,
      body: "Something is wrong",
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  }
};

module.exports = { handler };
