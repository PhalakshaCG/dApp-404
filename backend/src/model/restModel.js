import mongoose from "mongoose";

const schema = mongoose.Schema;

export const ProfileSchema = new schema({
  name: {
    type: String,

    required: "Please enter a name.",
  },
  public_id: {
    type: String,
    required: "Please enter a public address",
    unique: true,
  },
  password: {
    type: String,
    required: "Please enter a password",
  },
  email: {
    type: String,
  },
  penalties: {
    type: Number,
  },
  brownies: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  tags: {
    type: Array,
  },
  avatar: {
    data: Buffer,
    ContentType: String,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});
