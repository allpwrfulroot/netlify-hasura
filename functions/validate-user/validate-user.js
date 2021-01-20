// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

const fetch = require("node-fetch");

const handler = async function (event, context) {
  console.log("event? ", event);
  console.log("context? ", context);
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
  console.log("user? ", user);
  console.log("identity? ", identity);
  if (user && user.app_metadata) {
    const role = user.app_metadata?.roles?[0] || "student";
    return {
      statusCode: 200,
      body: JSON.stringify({
        "X-Hasura-User-Id": user.sub,
        "X-Hasura-Allowed-Roles": `{${role}}`,
        "X-Hasura-Role": role,
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
