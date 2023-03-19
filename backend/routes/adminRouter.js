const express = require("express");

const router = express.Router();

//controller functions
const {
  loginAdmin,
  getUser,
  blockUser,
  unBlockUser,
  getEditUser,
  editUser,
  getUserVideos,
  blockVideo,
  unBlockVideo,
  getReports,
  getVideo,
  blockVideoFromReports,
  unBlockVideoFromReports,
  viewReports,
  getCommunities,
  changeCommunityStatus,
  getLiveDetails,
  getDashboard,
  getAllVideos,
  searchVideos
} = require("../controllers/adminController");
const { requireAdminAuth } = require("../middleware/requireAuth");

// login route
router.post("/login", loginAdmin);

router.use(requireAdminAuth);

// get user
router.get("/user", getUser);

// block user
router.post("/user/block_user", blockUser);

// unblock user
router.post("/user/unblock_user", unBlockUser);

// get user
router.get("/user/get_editUser/:id", getEditUser);

// user edit
router.post("/user/editUser/:id", editUser);

// get user videos
router.get("/user/getUserVideos", getUserVideos);

// block user videos
router.patch("/user/blockVideo", blockVideo);

// unblock user
router.patch("/user/unBlockVideo", unBlockVideo);

// get all reports
router.get("/getReports", getReports);

// get view video
router.get("/user/view_video", getVideo);

// block from reports
router.patch("/user/reports/blockVideo", blockVideoFromReports);

// unblock from reports
router.patch("/user/reports/unBlockVideo", unBlockVideoFromReports);

// view reports
router.get("/user/reports/viewReports", viewReports);

// get all communities
router.get("/communities", getCommunities);

// change status
router.post("/communities/change_status", changeCommunityStatus);

// get live information
router.get("/live", getLiveDetails);

// get dashboard
router.get("/dashboard", getDashboard);

// get videos
router.get("/videos", getAllVideos);

// search videos
router.get("/search", searchVideos);



module.exports = router;
