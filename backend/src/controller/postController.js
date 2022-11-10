import mongoose from "mongoose";

import { PostSchema } from "../model/postModel.js";

const Post = mongoose.model("Post", PostSchema);

export const addPost = (req, res) => {
  let newPost = new Post(req.body);

  newPost.save((err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
};
export const getUserPosts = (req, res) => {
  Post.find({ userid: req.params.userid }, (err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
};

export const deleteUserPosts = (req, res) => {
  Post.deleteMany({ userid: req.params.userid }, (err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
};
