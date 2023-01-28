const express = require('express');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();


// require auth for all requests
router.use(requireAuth);









module.exports = router;