const express = require("express");

const router = express.Router();

//controller functions
const {
  loginAdmin,
  getUser,
  blockUser,
  unBlockUser,
  getEditUser,
  editUser
} = require("../controllers/adminController");

// login route
router.post("/login", loginAdmin);

// get user
router.get("/user", getUser);

// block user
router.post("/user/block_user", blockUser);

// unblock user
router.post("/user/unblock_user", unBlockUser);

// get user
router.get("/user/get_editUser/:id", getEditUser);

// user edit
router.post("/user/editUser/:id", editUser)



module.exports = router;
