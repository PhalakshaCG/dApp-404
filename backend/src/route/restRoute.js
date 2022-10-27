import {
  addProfile,
  getProfiles,
  getProfileByID,
  updateProfileByID,
  deleteProfileByID,
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
};

export default allRoutes;
