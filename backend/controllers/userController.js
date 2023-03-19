const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const OtpVerification = require("../models/userOtpVerification");
const userVerification = require("../models/userVerification");
const Follow = require("../models/followModel");
const generateOtp = require("../utilities/generateOtp");
const createToken = require("../utilities/jwtToken");
const Upload = require("../models/uploadModel");
const LiveSetUp = require("../models/liveModel");
const History = require("../models/historyModel");
const Comments = require("../models/commentModel");
const {
  Types: { ObjectId },
} = require("mongoose");
const { getVideoDetails } = require("../utilities/helper");

// login user
const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body.data.user;

  try {
    const userDetails = await User.login(userEmail, userPassword);

    if (userDetails.status === "blocked") {
      res.status(400).json({ error: "This user is blocked" });
    } else {
      // create a token
      const token = createToken(userDetails._id);

      const { ...use } = userDetails;

      const { password, createdAt, updatedAt, ...user } = use._doc;

      res.status(200).json({ token, user });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body.data.user;

  try {
    const user = await userVerification.verification(
      email,
      password,
      phone,
      firstname,
      lastname
    );

    const data = await generateOtp(user._id, user.email);

    res.status(200).json({ userId: user._id, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// verify user
const verifyOtp = async (req, res) => {
  try {
    const { otp, userId } = req.body.data;

    const userOtpVerificationRecords = await OtpVerification.findOne({
      userId,
    });

    if (userOtpVerificationRecords.length <= 0) {
      // no records found
      throw new Error(
        "Account record doesn't exist or has been verified already."
      );
    } else {
      // user otp record exist
      console.log(userOtpVerificationRecords);
      const { expiresAt } = userOtpVerificationRecords;
      const hashedOtp = userOtpVerificationRecords.otp;

      if (expiresAt < Date.now()) {
        // user otp record has expired
        await OtpVerification.deleteMany({ userId });
        throw new Error("Code has expired. Please request again");
      } else {
        const validOtp = await bcrypt.compare(otp, hashedOtp);

        if (!validOtp) {
          // supplied otp is wrong
          throw new Error("Invalid code passed. Check your inbox.");
        } else {
          // success
          const verifiedUser = await userVerification.findOne({ _id: userId });
          console.log(verifiedUser, "verified user");

          const { firstname, lastname, email, phone, password } = verifiedUser;

          // creating new user
          const user = await User.create({
            email,
            password,
            firstname,
            lastname,
            phone,
            status: "active",
          });

          // deleting all other collection data of the user
          await userVerification.deleteMany({ _id: userId });
          await OtpVerification.deleteMany({ userId });

          res.status(200).json({ status: "success" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// get user profile videos and liked videos
const getProfile = async (req, res) => {
  const userId = req.user.valueOf();

  try {
    const { myVideos, likedVideos } = await getVideoDetails(userId);
    res.status(200).json({ myVideos, likedVideos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// change cover image
const changeCoverImg = async (req, res) => {
  const { cover_image } = req.body;
  const userId = req.user._id;

  try {
    const updatedData = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { cover_image } },
      { returnDocument: "after" }
    );

    const spread = { ...updatedData };

    const { _id, createdAt, updatedAt, password, ...user } = spread._doc;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeCover = async (req, res) => {
  const userId = req.user._id;

  try {
    const updatedData = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { cover_image: null } },
      { returnDocument: "after" }
    );

    const spread = { ...updatedData };

    const { _id, createdAt, updatedAt, password, ...user } = spread._doc;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editProfile = async (req, res) => {
  const userId = req.user._id;
  const { firstname, lastname, address, image } = req.body.data;

  try {
    const updatedData = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { firstname, lastname, address, image } },
      { returnDocument: "after" }
    );

    const spread = { ...updatedData };

    const { _id, createdAt, updatedAt, password, ...user } = spread._doc;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeProfilePicture = async (req, res) => {
  const userId = req.user._id;

  try {
    const updatedData = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { image: null } },
      { returnDocument: "after" }
    );
    const spread = { ...updatedData };

    const { _id, createdAt, updatedAt, password, ...user } = spread._doc;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// searching
const getSearchList = async (req, res) => {
  const { name } = req.params;

  try {
    const searchList = await User.find({
      firstname: { $regex: name, $options: "$i" },
    });

    if (req.user) {
      const userId = req.user._id.valueOf();
      const idList = searchList.map((x) => x._id.valueOf());

      const followList = await Follow.aggregate([
        { $match: { userId } },
        {
          $project: {
            commonElement: {
              $setIntersection: [idList, "$following"],
            },
          },
        },
      ]);

      // looking for not includes in the list
      const notFollowingId = idList.filter((x) => {
        if (followList[0]) {
          return followList[0]?.commonElement.indexOf(x) === -1;
        } else {
          return x;
        }
      });

      const notFollowingUsers = await User.find({
        _id: { $in: notFollowingId },
      });

      // getting following users
      const followingUsers = await User.find({
        _id: { $in: followList[0]?.commonElement },
      });

      res
        .status(200)
        .json({ following: followingUsers, notFollowing: notFollowingUsers });
    } else {
      res.status(200).json({ following: [], notFollowing: searchList });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// get followers
const getFollowers = async (req, res) => {
  const userId = req.user.valueOf();

  try {
    const exist = await Follow.findOne({ userId });
    if (!exist) {
      return res.status(200).json({ result: "no results" });
    }

    const followers = await Follow.aggregate([
      { $match: { userId } },
      { $unwind: "$following" },
      {
        $addFields: {
          _id: { $toObjectId: "$following" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $project: {
          result: 1,
          _id: 0,
        },
      },
    ]);

    const result = followers.map((x) => {
      return x.result[0];
    });
    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    // error handling pending
  }
};

// follow request
const followRequest = async (req, res) => {
  const { id } = req.body;
  const userId = req?.user?._id;

  try {
    const exist = await Follow.findOne({ userId });
    if (!exist) {
      const response = await Follow.create({
        userId,
        following: id,
      });

      console.log(response);
      // send response here ...
    }

    if (exist) {
      const alreadyFollowing = await Follow.findOne({
        $and: [{ userId }, { following: id }],
      });

      if (alreadyFollowing) {
        // conflict
        res.status(409).json({ response: "Already following" });
      } else {
        const response = await Follow.findOneAndUpdate(
          { userId },
          { $push: { following: id } },
          { returnDocument: "after" }
        );
        console.log(response);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// unFollow request
const unFollowRequest = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.valueOf();

  try {
    const exist = await Follow.findOne({ userId });
    if (!exist) {
      // handle this situation ...
      return;
    }

    if (exist) {
      if (exist.following.length <= 1) {
        await Follow.deleteOne({ userId });
        return res.status(200).json({ result: "no results" });
      } else {
        await Follow.findOneAndUpdate(
          { userId },
          { $pull: { following: id } },
          { returnDocument: "after" }
        );

        const followers = await Follow.aggregate([
          { $match: { userId } },
          { $unwind: "$following" },
          {
            $addFields: {
              _id: { $toObjectId: "$following" },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "result",
            },
          },
          {
            $project: {
              result: 1,
              _id: 0,
            },
          },
        ]);

        const result = followers.map((x) => {
          return x.result[0];
        });
        console.log(followers);

        res.status(200).json(result);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// view video
const viewVideo = async (req, res) => {
  const { id, userId } = req.query;
  try {
    const viewVideo = await Upload.findOne({ _id: id });
    if (!viewVideo) {
      return res.status(200).json(null);
    } else {
      let likes = false;
      let disLikes = false;
      if (userId !== "undefined" && userId !== "null") {
        const exist = await User.findOne({ _id: userId });

        if (exist) {
          likes = viewVideo.video.likes.includes(userId);
          disLikes = viewVideo.video.disLikes.includes(userId);
          // Add to history
          const history = await History.findOne({ userId });

          if (history) {
            console.log("history exist");
            const alreadyInHistory = await History.aggregate([
              { $match: { userId } },
              {
                $match: {
                  "videos.id": ObjectId(id),
                },
              },
            ]);

            if (alreadyInHistory?.length > 0) {
              await History.updateOne(
                { userId },
                { $pull: { videos: { id: ObjectId(id) } } }
              );
            }
            await History.updateOne(
              { userId },
              { $push: { videos: { id: ObjectId(id), Date: new Date() } } }
            );
          } else {
            await History.create({
              userId,
              videos: {
                id: ObjectId(id),
                Date: new Date(),
              },
            });
          }
        }
      }

      // get comments
      const comments = await Comments.find({ videoId: id });

      const totalLikes = viewVideo?.video?.likes?.length;
      res
        .status(200)
        .json({ viewVideo, likes, disLikes, totalLikes, comments });
    }
  } catch (error) {
    console.log(error);
  }
};

// live setup
const setUpLive = async (req, res) => {
  const { thumbnail, description } = req.body;
  const userId = req.user;

  try {
    const settingUpLive = await LiveSetUp.setLive(
      userId,
      thumbnail,
      description
    );
    console.log(settingUpLive);
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
  }
};

// start live
const startLive = async (req, res) => {
  const url = req?.body?.sharedLinks[1]?.url;
  const userId = req.user;
  
  try {
    const response = await LiveSetUp.updateOne(
      { userId },
      { $set: { url, streaming: true } }
    );
    console.log(response);
    res.status(200);
  } catch (error) {
    console.log(error);
  }
};

// end live
const endLive = async (req, res) => {
  const userId = req.user;

  try {
    // const response = await LiveSetUp.updateOne(
    //   { userId },
    //   { $set: { streaming: false } }
    // );
    // console.log(response);
    await LiveSetUp.deleteMany({ userId })
    res.status(200);
  } catch (error) {
    console.log(error);
  }
};

// live section for home
const getHome = async (req, res) => {
  try {
    const liveVideo = await LiveSetUp.find({ streaming: true });
    const videosList = await Upload.find();

    const homeData = {
      liveVideo,
      randomVideos: videosList,
    };

    res.status(200).json({ homeData });
  } catch (error) {
    console.log(error);
  }
};

// comment on video
const commentVideo = async (req, res) => {
  const { videoId, commenter, commenterImage, comment } = req.body;
  const dateObj = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const date = dateObj.toLocaleString("en-IN", options); // returns the date in Indian Standard Time

  try {
    await Comments.create({
      videoId,
      chat: [
        {
          commenter,
          commenterImage,
          comment,
          date,
        },
      ],
    });

    const comments = await Comments.find({ videoId });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};

// get genre
const getGenre = async (req, res) => {
  try{
    const videos = await Upload.find();
    res.status(200).json(videos);
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = {
  loginUser,
  signupUser,
  verifyOtp,
  changeCoverImg,
  removeCover,
  editProfile,
  removeProfilePicture,
  getSearchList,
  followRequest,
  getProfile,
  getFollowers,
  unFollowRequest,
  viewVideo,
  setUpLive,
  startLive,
  endLive,
  getHome,
  commentVideo,
  getGenre
};
