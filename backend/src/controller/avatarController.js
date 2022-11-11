import express from "express";
const app = express();
import mongoose from "mongoose";

import multer from "multer";

import path from "path";

import { AvatarSchema } from "../model/avatarModel.js";

import fs from "fs";

const avatar = mongoose.model("avatar", AvatarSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const newRoute = (app) => {
  app.post("/addavatar", upload.single("testavatar"), (req, res) => {
    const saveImage = avatar({
      userid: req.body.userid,
      avatar: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
    });
    saveImage.save((err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  });
  app.get("/getavatar/:userid", (req, res) => {
    avatar.findOne({ userid: req.params.userid }, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  });
};

export default newRoute;

// const Storage = multer.diskStorage({
//   desitnation: (req, file, callback) => {
//     console.log(file);
//     callback(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     // console.log(file);
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: Storage,
// });

// app.post("/addavatar", upload.single("testavatar"), (req, res) => {
//   const newAvatar = new avatar({
//     userid: req.body.userid,
//     avatar: {
//       data: fs.readFileSync("uploads/" + req.file.filename),
//       contentType: "image/png",
//     },
//   });
//   newAvatar
//     .save()
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => console.log(err));
// });

// export const addAvatar = (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         const newAvatar = new avatar({
//           userid: req.body.userid,
//           avatar: {
//             data: fs.readFileSync(
//               path.join(__dirname + "/uploads/" + req.file.filename)
//             ),
//             contentType: "image/png",
//           },
//         });
//         newAvatar
//           .save()
//           .then(() => res.send("avatar added"))
//           .catch((err) => console.log(err));
//       }
//     }
//   });
// };

// export const addAvatar = (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const newAvatar = new avatar({
//         userid: req.body.userid,
//         avatar: {
//           data: req.file.filename,
//           contentType: "image/png",
//         },
//       });
//       newAvatar
//         .save()
//         .then(() => res.send("avatar added"))
//         .catch((err) => console.log(err));
//     }
//   });
// };

// export const addAvatar = (req, res) => {
//   let newAvatar = new avatar({
//     userid: req.body.userid,
//     avatar: {
//       data: req.file.filename,
//       ContentType: "image/png",
//     },
//   });
//   newAvatar
//     .save()
//     .then(() => res.send("avatar added"))
//     .catch((err) => console.log(err));
// };
