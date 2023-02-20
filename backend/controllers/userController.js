const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const OtpVerification = require("../models/userOtpVerification");
const userVerification = require("../models/userVerification");
const Follow = require("../models/followModel");
const generateOtp = require("../utilities/generateOtp");
const createToken = require("../utilities/jwtToken");
const { default: mongoose } = require("mongoose");

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

      const { _id, password, createdAt, updatedAt, ...user } = use._doc;

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
};
