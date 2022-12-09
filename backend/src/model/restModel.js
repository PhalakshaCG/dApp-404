import mongoose from "mongoose";

const schema = mongoose.Schema;

export const ProfileSchema = new schema({
  name: {
    type: String,

    required: "Please enter a name.",
  },
  // _id: false,
  public_id: {
    type: String,
    required: "Please enter a public address",
    unique: true,
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
  avatar: {
    data: Buffer,
    ContentType: String,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = ProfileSchema = mongoose.model("Profile", ProfileSchema);
