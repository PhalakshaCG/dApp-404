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
import {
  addPost,
  getUserPosts,
  deleteUserPosts,
} from "../controller/postController.js";
// import { addAvatar } from "../controller/avatarController.js";
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
  app

    .route("/tags/delete")

    .get(Delete);
  app
    .route("/post/addpost")

    .post(addPost);
  app
    .route("/post/getuserposts/:userid")

    .get(getUserPosts);
  app
    .route("/post/deleteuserposts/:userid")

    .delete(deleteUserPosts);
  // app
  //   .route("/avatar/addavatar")

  //   .post(addAvatar);
};

export default allRoutes;
