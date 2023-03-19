const express = require('express');

const {requireAuth} = require('../middleware/requireAuth');

const router = express.Router();

// controller function
const uploadController = require('../controllers/uploadController');

const storage = require('../utilities/multer');


// require auth for all requests
router.use(requireAuth);

// upload video
router.post('/upload_video', storage.single("videoFile"), uploadController.uploadVideo);

// delete video
router.delete('/delete_video', uploadController.deleteVideo);

// like video
router.post('/view_video/like_video', uploadController.likeVideo);

// dislike video
router.post('/view_video/disLike_video', uploadController.disLikeVideo);

// get liked video
router.get('/liked_videos', uploadController.likedVideos);

// get history
router.get('/history', uploadController.getHistory);

// report video
router.post('/view_video/report_video', uploadController.reportVideo);

// clear history
router.delete("/clear_history", uploadController.clearHistory);





module.exports = router;