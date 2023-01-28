const express = require('express');

const router = express.Router();

//controller functions
const { loginAdmin } = require('../controllers/adminController');

// login route
router.post('/login', loginAdmin);





module.exports = router;