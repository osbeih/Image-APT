import express, { Request, Response } from "express";
import processImage from "../../utilities/processImage";
import path from "path";
import fs from "fs/promises";

const image = express.Router();

image.get("/", async (req: Request, res: Response) => {
  const fileName = String(req.query.fileName);
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  if (!fileName) {
    res.status(404).send("not found");
    return;
  }
  if (!width && !height) {
    res.send("enter width and height");
    return;
  }

  const imagePath = path.join(process.cwd(), "images", `${fileName}.jpg`);
  try {
    await fs.access(imagePath);
  } catch {
    return res.status(404).send("image is not exist");
  }
  const outputPath = await processImage(fileName, width, height);

  res.sendFile(outputPath);
});

export default image;
