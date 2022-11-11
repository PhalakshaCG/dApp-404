import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import allRoutes from "./src/route/restRoute.js";
import newRoute from "./src/controller/avatarController.js";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";

// import { AvatarSchema } from "./src/model/avatarModel.js";

import fs from "fs";

const port = 4000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.APP_URL],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

allRoutes(app);
newRoute(app);

app.get("/", (req, res) =>
  res.send(`Your node and express server is running on port: ${port}`)
);
// //avatar
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/addavatar", upload.single("testavatar"), (req, res) => {
//   const saveImage = AvatarSchema({
//     userid: req.body.userid,
//     avatar: {
//       data: fs.readFileSync("uploads/" + req.file.filename),
//       contentType: "image/png",
//     },
//   });
//   saveImage
//     .save()
//     .then((res) => {
//       console.log("image is saved");
//     })
//     .catch((err) => {
//       console.log(err, "error has occur");
//     });
//   res.send("image is saved");
// });
// //ga
app.listen(port, () => {
  console.log("restAPI is running on port: " + port);
});
