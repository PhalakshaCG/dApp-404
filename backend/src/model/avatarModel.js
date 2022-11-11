import mongoose from "mongoose";

const schema = mongoose.Schema;

export const AvatarSchema = new schema({
  userid: {
    type: String,
    required: "Please enter a public address",
    required: true,
    unique: true,
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
});

// const AvatarSchema = new mongoose.Schema({
//   userid: {
//     type: String,
//     required: "Please enter a public address",
//     required: true,
//     unique: true,
//   },
//   avatar: {
//     data: Buffer,
//     contentType: String,
//   },
// });

// module.exports = AvatarSchema = mongoose.model("Avatar", AvatarSchema);
