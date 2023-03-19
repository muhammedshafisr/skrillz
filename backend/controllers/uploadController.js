const Upload = require("../models/uploadModel");
const cloudinary = require("../utilities/cloudinary");
const User = require("../models/userModel");
const LikedVideos = require("../models/likedVideosModel");
const { getVideoDetails } = require("../utilities/helper");
const History = require("../models/historyModel");
const Reports = require("../models/reportModel");

const {
  Types: { ObjectId },
} = require("mongoose");

exports.uploadVideo = (req, res) => {
  const userId = req.user._id;

  try {
    cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "video",
        folder: `videos/${userId}`,
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        const url = result.url;
        const cloudinaryId = result.public_id;
        const { name, description, thumbnail, category } = req.body;
        
        await Upload.setVideo(
          userId,
          name,
          url,
          cloudinaryId,
          description,
          thumbnail,
          category
        );

        const { myVideos, likedVideos } = await getVideoDetails(userId);
        console.log(myVideos, "this is my videos");
        res.status(200).json({ myVideos, likedVideos });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(err);
  }
};

// delete video
exports.deleteVideo = async (req, res) => {
  const userId = req.user.valueOf();
  const { cloudId, id } = req.body;
  try {
    await cloudinary.uploader.destroy(cloudId, async (err, result) => {
      console.log(err);
      console.log(result);

      // const exist = await Upload.aggregate([
      //   { $match: { userId } },
      //   {
      //     $project: {
      //       _id: 0,
      //       videosCount: { $size: "$videos" },
      //     },
      //   },
      // ]);

      const exist = await Upload.findOne({ _id: id, userId });

      if (!exist) {
        res.status(200).json(null);
      } else {
        await Upload.deleteOne({ _id: id });
        const { myVideos, likedVideos } = await getVideoDetails(userId);
        console.log(myVideos);
        // before sending back to clint please remove it form the liked list also..
        res.status(200).json({ myVideos, likedVideos });
      }

      // if (exist[0].videosCount <= 1) {
      // await Upload.deleteOne({ _id: id });
      // res.status(200).json(null);
      // } else {
      //   const response = await Upload.findOneAndUpdate(
      //     { userId },
      //     { $pull: { videos: { cloudinaryId: id } } },
      //     { returnDocument: "after" }
      //   );
      // res.status(200).json(response);
      // }
    });
  } catch (error) {
    console.log(error);
  }
};

// like video
exports.likeVideo = async (req, res) => {
  const userId = req.user.valueOf();
  let { id } = req.body;
  id = ObjectId(id);

  try {
    // checking for dislike
    const isDisLike = await Upload.aggregate([
      { $match: { _id: id } },
      {
        $match: {
          "video.disLikes": {
            $in: [userId],
          },
        },
      },
    ]);

    if (isDisLike.length > 0) {
      // remove dislike
      await Upload.updateOne(
        { _id: id },
        { $pull: { "video.disLikes": userId } }
      );
    }
    console.log("disliked ?", isDisLike);
    // already liked ??
    const alreadyLiked = await Upload.aggregate([
      { $match: { _id: id } },
      {
        $match: {
          "video.likes": {
            $in: [userId],
          },
        },
      },
    ]);
    console.log(alreadyLiked, alreadyLiked.length);

    if (alreadyLiked.length > 0) {
      console.log("byw");
      return res.status(200).json({ status: "already liked" });
    }

    // adding to liked video list
    console.log(userId);
    const exist = await LikedVideos.findOne({ userId });
    console.log(exist, "this is exist");
    if (!exist) {
      console.log("im in");
      await LikedVideos.create({
        userId,
        likedVideo: [
          {
            video: ObjectId(id),
          },
        ],
      });
    } else {
      await LikedVideos.findOneAndUpdate(
        { userId },
        { $push: { likedVideo: { video: ObjectId(id) } } },
        { returnDocument: "after" }
      );
    }

    // adding liked to the video
    const likeVideo = await Upload.updateOne(
      { _id: id },
      { $push: { "video.likes": userId } }
    );
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
  }
};

// dislike video
exports.disLikeVideo = async (req, res) => {
  const userId = req.user.valueOf();
  let { id } = req.body;
  id = ObjectId(id);

  try {
    // checking for it is liked or not
    const isLike = await Upload.aggregate([
      { $match: { _id: id } },
      {
        $match: {
          "video.likes": {
            $in: [userId],
          },
        },
      },
    ]);

    if (isLike.length > 0) {
      // remove like from video
      await Upload.updateOne({ _id: id }, { $pull: { "video.likes": userId } });

      // remove video form liked videos
      const liked = await LikedVideos.findOne({ userId });
      console.log(liked.likedVideo.length);
      if (liked.likedVideo.length <= 1) {
        await LikedVideos.deleteOne({ userId });
      } else {
        await LikedVideos.findOneAndUpdate(
          { userId },
          { $pull: { likedVideo: { video: ObjectId(id) } } },
          { returnDocument: "after" }
        );
      }
    }
    console.log("this is dislikes", isLike);
    // already liked ??
    const alreadyDisliked = await Upload.aggregate([
      { $match: { _id: id } },
      {
        $match: {
          "video.disLikes": {
            $in: [userId],
          },
        },
      },
    ]);

    if (alreadyDisliked.length > 0) {
      console.log("byw");
      return res.status(200).json({ status: "already liked" });
    }

    const disLikeVideo = await Upload.updateOne(
      { _id: id },
      { $push: { "video.disLikes": userId } }
    );
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
  }
};

// liked videos
exports.likedVideos = async (req, res) => {
  const userId = req.user.valueOf();

  try {
    const exist = await LikedVideos.findOne({ userId });
    if (!exist) {
      return res.status(200).json(null);
    }

    const likedVideos = await LikedVideos.aggregate([
      { $match: { userId } },
      { $unwind: "$likedVideo" },
      {
        $lookup: {
          from: "uploads",
          localField: "likedVideo.video",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $project: {
          _id: 0,
          result: 1,
        },
      },
    ]);

    res.status(200).json({ likedVideos });
  } catch (error) {
    console.log(error);
  }
};

// get History
exports.getHistory = async (req, res) => {
  const userId = req.user.valueOf();
  try {
    const history = await History.aggregate([
      { $match: { userId } },
      { $unwind: "$videos" },
      {
        $project: {
          result: 1,
          "videos.id": 1,
          date: { $dateToString: { format: "%d-%m-%Y", date: "$videos.Date" } },
        },
      },
      {
        $lookup: {
          from: "uploads",
          localField: "videos.id",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
          },
          result: {
            $push: "$result",
          },
        },
      },
      { $limit: 7 },
      { $sort: { "_id.date": -1 } },
    ]);
    if (history.length < 1) {
      return res.status(200).json(null);
    }
    res.status(200).json(history);
  } catch (error) {
    console.log(error);
  }
};

// report video
exports.reportVideo = async (req, res) => {
  const { select, text, id, uploader } = req.body;
  const userId = req.user.valueOf();

  try{
    const exist = await Reports.findOne({ reporterId: userId, videoId: id });
    if (exist) {
      // already reported for this video
      return res.status(200).json(false)
    }
    
    await Reports.create({
      videoId: ObjectId(id),
      reporterId: userId,
      uploader,
      reports: {
        select,
        text
      }
    });

    res.status(200).json(true);
  }
  catch(error) {
    console.log(error);
  }
}


// clear history
exports.clearHistory = async (req, res) => {
  const userId = req.user.valueOf();
  try{
    await History.deleteOne({ userId })
    res.status(200).json(null);
  }
  catch(error) {
    console.log(error);
  }
}