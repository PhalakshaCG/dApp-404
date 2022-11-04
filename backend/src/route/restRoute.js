import {
  addProfile,
  getProfiles,
  getProfileByID,
  updateProfileByID,
  deleteProfileByID,
  checkProfile,
  addTags,
  getAllTags,
  updateTags,
  Delete,
  getusertags,
} from "../controller/restController.js";

const allRoutes = (app) => {
  app
    .route("/profile")

    .get(getProfiles)

    .post(addProfile);

  app
    .route("/profile/:profileID")

    .get(getProfileByID)

    .delete(deleteProfileByID)

    .put(updateProfileByID);
  app
    .route("/profile/check/:publicAddress")

    .get(checkProfile);
  app
    .route("/profile/getusertags/:profileID")

    .get(getusertags);
  app
    .route("/tags")

    .get(getAllTags)

    .post(addTags)

    .put(updateTags);
  app.route("/tags/delete").get(Delete);
};

export default allRoutes;
