export const handler = async (event, context) => {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  
  const name = event.queryStringParameters? event.queryStringParameters.name : (event.name || "world");
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${name}`,
    }),
  };

  return response;
};
