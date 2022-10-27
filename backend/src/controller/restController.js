import mongoose from "mongoose";

import { ProfileSchema } from "../model/restModel.js";

const Profile = mongoose.model("Profile", ProfileSchema);

export const addProfile = (req, res) => {
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

export const getProfileByID = (req, res) => {
  Profile.findById(req.params.publicID, (err, profile) => {
    if (err) {
      res.send(err);
    }

    res.json(profile);
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
    { _id: req.params.profileID },

    (err, profile) => {
      if (err) {
        res.send(err);
      }

      res.json({ message: "The profile was deleted." });
    }
  );
};
