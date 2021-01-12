// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

const fetch = require("node-fetch");

const handler = async function (event, context) {
  if (!context.clientContext && !context.clientContext.identity) {
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({
        msg: "No identity instance detected. Did you enable it?",
      }),
    };
  }
  const { identity, user } = context.clientContext;
  if (user) {
    const userID = user.sub;
    return {
      statusCode: 200,
      body: JSON.stringify({
        "X-Hasura-User-Id": userID,
        "X-Hasura-Role": "instructor",
      }),
    };
  }
  return {
    statusCode: 401,
    body: JSON.stringify({
      msg: "No role found; not authorized",
    }),
  };
};

module.exports = { handler };
