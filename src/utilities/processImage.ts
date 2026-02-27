import sharp from "sharp";
import path from "path";

const processImage = async (
  fileName: string,
  width: number,
  height: number,
) => {
  const imagePath = path.join(process.cwd(), "images", `${fileName}.jpg`);
  const outputPath = path.join(process.cwd(), "thumb", `${fileName}.thumb.jpg`);

  if (width < 1 || height < 1) {
    throw new Error("width or height invalid");
  }
  await sharp(imagePath).resize(width, height).toFile(outputPath);

  return outputPath;
};

export default processImage;
