import mongoose from "mongoose";

import { ProfileSchema } from "../model/restModel.js";

import { TagSchema } from "../model/tagModel.js";

const Profile = mongoose.model("Profile", ProfileSchema);

const Tag = mongoose.model("Tag", TagSchema);

export const addProfile = (req, res) => {
  // console.log(req.body);
  // TODO: Make public address small letters
  let newProfile = new Profile(req.body);

  newProfile.save((err, profile) => {
    if (err) {
      res.send(err);
    }

    res.json(profile);
  });
};

export const getProfiles = (req, res) => {
  Profile.find({}, (err, profile) => {
    if (err) {
      res.send(err);
    }

    res.json(profile);
  });
};
export const checkProfile = (req, res) => {
  Profile.exists({ public_id: req.params.publicAddress }, (err, profile) => {
    if (err) {
      res.send(err);
    }
    if (profile === null) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
};

export const getProfileByID = (req, res) => {
  Profile.findOne({ public_id: req.params.profileID }, (err, profile) => {
    if (err) {
      res.send(err);
    }
    console.log(profile);
    res.json(profile?.profile);
  });
};

export const updateProfileByID = (req, res) => {
  Profile.findOneAndUpdate(
    { _id: req.params.publicID },

    req.body,

    { new: true },

    (err, profile) => {
      if (err) {
        res.send(err);
      }

      res.json(profile);
    }
  );
};

export const deleteProfileByID = (req, res) => {
  Profile.remove(
    { public_id: req.params.profileID },

    (err, profile) => {
      if (err) {
        return res.send(err);
      }

      res.json({ message: "The profile was deleted." });
    }
  );
};

//tags
export const getusertags = (req, res) => {
  Profile.findOne({ public_id: req.params.profileID }, (err, profile) => {
    if (err) {
      res.send(err);
    }
    console.log(profile);
    res.json(profile?.tags);
  });
};
export const addTags = (req, res) => {
  let newTags = new Tag(req.body);

  newTags.save((err, tag) => {
    if (err) {
      res.send(err);
    }

    res.json(tag);
  });
};
export const getAllTags = (req, res) => {
  Tag.find({}, (err, tag) => {
    if (err) {
      res.send(err);
    }

    res.json(tag);
  });
};
export const updateTags = (req, res) => {
  Tag.findOneAndUpdate(
    { _id: "63622119a18d6735a109cef8" },

    req.body,

    { new: true },

    (err, tag) => {
      if (err) {
        res.send(err);
      }

      res.json(tag);
    }
  );
};

export const Delete = (req, res) => {
  Tag.deleteMany({}, (err, tag) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: "The tag was deleted." });
  });
};
