import express from "express";
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const image = express.Router();

image.get("/", async (req, res) => {
  try {
    const fileName = req.query.fileName;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    const imagePath = path.join(process.cwd(), "images", `${fileName}.jpg`);
    const outputPath = path.join(
      process.cwd(),
      "thumb",
      `${fileName}.thumb.jpg`,
    );

    await sharp(imagePath).resize(width, height).toFile(outputPath);

    res.sendFile(outputPath);
  } catch (err) {
    console.log(err);
    return res.status(500).send("cannot read image");
  }
});

export default image;
