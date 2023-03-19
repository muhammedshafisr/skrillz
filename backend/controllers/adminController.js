const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Uploads = require("../models/uploadModel");
const Reports = require("../models/reportModel");
const Community = require("../models/communityModel");
const Live = require("../models/liveModel");
const jwt = require("jsonwebtoken");
const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });

const loginAdmin = async (req, res) => {
  const { email, password } = req.body.data.admin;

  try {
    const admin = await Admin.login(email, password);

    // create a token
    const token = createToken(admin._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const blockUser = async (req, res) => {
  const userId = req.body.id;

  try {
    await User.updateOne({ _id: userId }, { $set: { status: "blocked" } });
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const unBlockUser = async (req, res) => {
  const userId = req.body.id;

  try {
    await User.updateOne({ _id: userId }, { $set: { status: "active" } });
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getEditUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.updateOne({ _id: userId }, { $set: { status: "active" } });
    const user = await User.findOne({ _id: userId });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, email, phone } = req.body;

  try {
    await User.updateOne(
      { _id: userId },
      { $set: { firstname, lastname, email, phone } }
    );
    const user = await User.findOne({ _id: userId });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// get user videos
const getUserVideos = async (req, res) => {
  const { id } = req.query;

  try {
    const videos = await Uploads.find({ userId: id });
    if (videos.length < 1) {
      return res.status(200).json(null);
    }

    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
  }
};

// block user video
const blockVideo = async (req, res) => {
  const { id, userId } = req.body;

  try {
    const exist = await Uploads.findOne({ _id: id });
    console.log("is exist??", exist);
    if (!exist) {
      return res.status(200).json(null);
    }

    await Uploads.updateOne({ _id: id }, { $set: { "video.status": true } });
    const videos = await Uploads.find({ userId });

    res.status(200).json({ status: true, videos });
  } catch (error) {
    console.log(error);
  }
};

// unBlock user video
const unBlockVideo = async (req, res) => {
  const { id, userId } = req.body;

  try {
    const exist = await Uploads.findOne({ _id: id });
    console.log("is exist??", exist);
    if (!exist) {
      return res.status(200).json(null);
    }

    await Uploads.updateOne({ _id: id }, { $set: { "video.status": false } });
    const videos = await Uploads.find({ userId });

    res.status(200).json({ status: true, videos });
  } catch (error) {
    console.log(error);
  }
};

// get video
const getVideo = async (req, res) => {
  const { id } = req.query;

  try {
    const viewVideo = await Uploads.findOne({ _id: id });
    if (!viewVideo) {
      return res.status(200).json(null);
    }

    res.status(200).json(viewVideo);
  } catch (error) {
    console.log(error);
  }
};

// get video reports
const getReports = async (req, res) => {
  try {
    const reports = await Reports.aggregate([
      {
        $group: {
          _id: {
            videoId: "$videoId",
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "uploads",
          localField: "_id.videoId",
          foreignField: "_id",
          as: "result",
        },
      },
      { $sort: { count: -1 } },
    ]);

    if (reports < 1) {
      return res.status(200).json(null);
    }
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
  }
};

const blockVideoFromReports = async (req, res) => {
  const { id } = req.body;

  try {
    const exist = await Uploads.findOne({ _id: id });
    console.log("is exist??", exist);
    if (!exist) {
      return res.status(200).json(null);
    }

    await Uploads.updateOne({ _id: id }, { $set: { "video.status": true } });
    const reports = await Reports.aggregate([
      {
        $group: {
          _id: {
            videoId: "$videoId",
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "uploads",
          localField: "_id.videoId",
          foreignField: "_id",
          as: "result",
        },
      },
      { $sort: { count: -1 } },
    ]);

    if (reports < 1) {
      return res.status(200).json(null);
    }
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
  }
};

const unBlockVideoFromReports = async (req, res) => {
  const { id } = req.body;

  try {
    const exist = await Uploads.findOne({ _id: id });
    console.log("is exist??", exist);
    if (!exist) {
      return res.status(200).json(null);
    }

    await Uploads.updateOne({ _id: id }, { $set: { "video.status": false } });
    const reports = await Reports.aggregate([
      {
        $group: {
          _id: {
            videoId: "$videoId",
          },
          count: { $count: {} },
        },
      },
      {
        $lookup: {
          from: "uploads",
          localField: "_id.videoId",
          foreignField: "_id",
          as: "result",
        },
      },
      { $sort: { count: -1 } },
    ]);

    if (reports < 1) {
      return res.status(200).json(null);
    }
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
  }
};

// view reports
const viewReports = async (req, res) => {
  const { id } = req.query;

  try {
    let video = await Uploads.findOne({ _id: id });
    if (!video) {
      video = null;
    }

    // get report
    let reports = await Reports.find({ videoId: id });
    if (reports.length < 1) {
      reports = null;
    }
    res.status(200).json({ video, reports });
  } catch (error) {
    console.log(error);
  }
};

// get all communities
const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find();

    if (communities?.length < 1) {
      return res.status(200).json(null);
    }
    res.status(200).json(communities);
  } catch (error) {
    console.log(error);
  }
};

// change community status
const changeCommunityStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    await Community.updateOne(
      { _id: id },
      { $set: { status: status ? false : true } }
    );

    const communities = await Community.find();

    if (communities?.length < 1) {
      return res.status(200).json(null);
    }
    res.status(200).json(communities);
  } catch (error) {
    console.log(error);
  }
};

// get live information
const getLiveDetails = async (req, res) => {
  try{
    const live = await Live.find();
    // handle if there is no live

    res.status(200).json(live);
  }
  catch (error) {
    console.log(error);
  }
};

// get dashboard
const getDashboard = async (req, res) => {
  try{
    const chartData = await Uploads.aggregate([
      {
          $project : {
              "day" : { "$dayOfMonth": "$createdAt" },
              "month" : { "$month": "$createdAt" },
              'year' : { "$year" : '$createdAt' }
          }
      },
      {
          $group: {
              _id: { 
                  day : '$day',
                  month : '$month',
                  year : '$year'
              },
              count: { $count: {} }
          }
      }
      ,{
          $limit: 7
      },
      {
          $sort : { _id : 1 }
      }
  ]);

  const totalUsers = await User.find().count();
  const totalVideos = await Uploads.find().count();
  const liveNow = await Live.find({ $and: [{ streaming: true}, { status: true }]}).count();
  const totalCommunity = await Community.find().count();

  res.status(200).json({ chartData, totalUsers, totalVideos, liveNow, totalCommunity });
  }
  catch(error) {
    console.log(error);
  }
}

// get all videos
const getAllVideos = async (req, res) => {
  try{
    const videos = await Uploads.find();
    res.status(200).json(videos)
  }
  catch(error) {
    console.log(error);
  }
}

// search videos
const searchVideos = async (req, res) => {
  try{
    const { name } = req.query;
    const searchList = await Uploads.find({"video.name": { $regex: name, $options: "$i" }})
    res.status(200).json(searchList);
  }
  catch(error){
    console.log(error);
  }
}


module.exports = {
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
};
