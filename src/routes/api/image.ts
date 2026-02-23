import express from 'express';

const image = express.Router();

image.get('/', (req,res) => {
    const fileName = req.query.fileName;
    const width = req.query.width;
    const height = req.query.height;
    console.log(`fileName : ${fileName}, Width : ${width}, height : ${height}`)
    res.send("Image Api");
    console.log()
})

export default image;