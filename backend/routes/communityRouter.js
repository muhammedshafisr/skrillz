const express = require('express');

const router = express.Router();

const {requireAuth} = require('../middleware/requireAuth');

const {
    createCommunity, getCommunity, sendChat, addNewMember, getChat
} = require('../controllers/communityController');


// require auth
router.use(requireAuth);

// get community
router.get("/community", getCommunity);

// create community
router.post("/create_community", createCommunity);

// get chat list
router.get("/community/chatList", getChat);

// send chat
router.post("/community/sendChat", sendChat);

// add chat member
router.post("/community/add_new_member", addNewMember);


module.exports = router;