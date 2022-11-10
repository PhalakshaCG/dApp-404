import mongoose from "mongoose";

const schema = mongoose.Schema;

export const PostSchema = new schema({
  postid: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: "Please enter a public address",
    required: true,
  },
  tagid: {
    type: String,
    required: true,
  },
});
