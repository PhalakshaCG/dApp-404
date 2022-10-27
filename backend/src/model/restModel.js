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
  tags: {
    type: Array,
  },
  creation_date: {
    type: Date,

    default: Date.now,
  },
});
