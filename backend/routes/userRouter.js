const express = require("express");

const router = express.Router();

const requireAuth = require("../middleware/requireAuth");

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
  followRequest
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// verify otp
router.post("/verifyOtp", verifyOtp)

// require auth
router.use(requireAuth)

// searching
router.get("/search/:name", getSearchList)

// add cover
router.post("/profile/add_cover", changeCoverImg);

// change cover
router.post("/profile/change_cover", changeCoverImg)

// remove cover
router.patch("/profile/remove_cover", removeCover)

// change profile
router.post("/profile/edit_profile", editProfile)

// remove profile image
router.patch("/profile/edit_profile/removeProfilePicture", removeProfilePicture);

// follow
router.post("/follow", followRequest);




module.exports = router;