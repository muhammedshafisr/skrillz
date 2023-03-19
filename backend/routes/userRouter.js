const express = require("express");

const router = express.Router();

const {requireAuth} = require("../middleware/requireAuth");

//controller functions
const {
  loginUser,
  signupUser,
  changeCoverImg,
  removeCover,
  editProfile,
  removeProfilePicture,
  getSearchList,
  verifyOtp,
  followRequest,
  getProfile,
  getFollowers,
  unFollowRequest,
  viewVideo,
  setUpLive,
  startLive,
  endLive,
  getHome,
  commentVideo,
  getGenre,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// verify otp
router.post("/verifyOtp", verifyOtp);

// view video
router.get("/profile/viewVideo", viewVideo);

// home live section
router.get("/home", getHome);

// require auth
router.use(requireAuth);

// searching
router.get("/search/:name", getSearchList);

// getting profile data
router.get("/profile", getProfile);

// add cover
router.post("/profile/add_cover", changeCoverImg);

// change cover
router.post("/profile/change_cover", changeCoverImg);

// remove cover
router.patch("/profile/remove_cover", removeCover);

// change profile
router.post("/profile/edit_profile", editProfile);

// remove profile image
router.patch(
  "/profile/edit_profile/removeProfilePicture",
  removeProfilePicture
);

// get followers
router.get("/get_followers", getFollowers);

// follow
router.patch("/follow", followRequest);

// unFollow
router.patch("/unFollow", unFollowRequest);

// live setup
router.post("/profile/live_setUp", setUpLive);

// start live
router.patch("/start_live", startLive);

// end live
router.patch("/end_live", endLive);

// send comment
router.post("/view_video/sendComment", commentVideo)

// get genre
router.get("/genre", getGenre);



module.exports = router;
