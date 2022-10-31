import {
  addProfile,
  getProfiles,
  getProfileByID,
  updateProfileByID,
  deleteProfileByID,
  checkProfile,
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
};

export default allRoutes;
