const Grid = require("gridfs-stream");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
import mongoose from "mongoose";
import { connection } from "utils/db";

let gfs;

connection?.conn?.once("open", function () {
  gfs = Grid(connection?.conn?.db, mongoose.mongo);
  gfs.collection("photos");
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-any-name-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});


export default async function handler(req, res) {
  if (req.method === "POST") {
    multer({ storage }).single("file")(req, res, () => {
      console.log(req.file);
      if (req.file === undefined) return res.send("you must select a file.");
      const imgUrl = `http://localhost:3000/file?name=${req.file.filename}`;
      res.send(imgUrl);
    });
  } else if (req.method === "GET") {
    try {
      const file = await gfs.files.findOne({ filename: req.query.filename });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } catch (error) {
      res.send("not found");
    }
  } else {
    res.status(400).send({ message: `Cannot ${req.method}` });
  }
}