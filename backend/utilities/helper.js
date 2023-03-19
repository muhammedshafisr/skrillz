const Upload = require("../models/uploadModel");
const LikedVideos = require("../models/likedVideosModel");


exports.getVideoDetails = async (userId) => {
    try{
     let likedVideos;

        // getting liked video list
    const exist = await LikedVideos.findOne({ userId });
    if (!exist) {
      likedVideos = {likedVideos: null};
    }
    else{
      likedVideos = await LikedVideos.aggregate([
        { $match: { userId } },
        { $unwind: "$likedVideo" },
        {
          $lookup: {
            from: "uploads",
            localField: "likedVideo._id",
            foreignField: "_id",
            as: "result",
          },
        },
      ]);
    };

    const myVideos = await Upload.find({ userId });
    return {myVideos, likedVideos}
    }
    catch(error) {
        return error;
    }
}