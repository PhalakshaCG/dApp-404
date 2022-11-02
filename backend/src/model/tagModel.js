import mongoose from "mongoose";

const schema = mongoose.Schema;

export const TagSchema = new schema({
  tags: {
    type: Array,
    required: "Please enter the tags",
  },
});
