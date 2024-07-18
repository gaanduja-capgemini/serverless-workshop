const { app } = require("@azure/functions");
const meme_generator = require("../shared/meme_generator.js");
app.http("meme", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    if (!request.query.get("image")) {
      return { status: 500, body: "Please provide an image URL" };
    }

    context.log(`Meme generator "${request.query.get("top")}"`);
    const image = await meme_generator(
      request.query.get("top"),
      request.query.get("bottom"),
      request.query.get("image"),
    );

    //context.log(image);
    return { body: image };
  },
});
