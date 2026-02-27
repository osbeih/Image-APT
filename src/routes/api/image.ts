import express from "express";
import processImage from "../../utilities/processImage";

const image = express.Router();

image.get("/", async (req, res) => {
  try {
    const fileName = String(req.query.fileName);
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    const outputPath = await processImage(fileName, width, height);

    res.sendFile(outputPath);
  } catch (err) {
    console.log(err);
    return res.status(500).send("cannot read image");
  }
});

export default image;
