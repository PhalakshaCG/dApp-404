import mongoose from "mongoose";

const schema = mongoose.Schema;

export const TagSchema = new schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: "Please enter the tags",
  },
});
