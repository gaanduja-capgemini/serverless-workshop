const Jimp = require("jimp");
const fetch = require("node-fetch");

const meme_generator = async function (
  top_text,
  bottom_text,
  bg_image_url,
  log,
) {
  const resp = await fetch(bg_image_url);
  const buff = await resp.buffer();
  const image = await Jimp.read(buff);

  if (image.bitmap.height < 100 || image.bitmap.width < 100) {
    image.scale(10);
  }

  const TOP_POS = 5;
  const BOTTOM_POS = image.bitmap.height - 90;

  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

  image.print(
    font,
    0,
    TOP_POS,
    {
      text: top_text.toUpperCase(),
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    },
    image.bitmap.width,
    image.bitmap.height,
  );

  image.print(
    font,
    0,
    BOTTOM_POS,
    {
      text: bottom_text.toUpperCase(),
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    },
    image.bitmap.width,
    image.bitmap.height,
  );

  return await image.getBufferAsync(Jimp.MIME_JPEG);
};

module.exports = meme_generator;
