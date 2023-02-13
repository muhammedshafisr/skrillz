const Admin = require("../models/adminModel");
const User = require("../models/userModel");
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
  const {
    firstname,
    lastname,
    email,
    phone
  } = req.body
  
  try {
    await User.updateOne({ _id: userId }, { $set: { firstname, lastname, email, phone } });
    const user = await User.findOne({ _id: userId });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}




module.exports = { loginAdmin, getUser, blockUser, unBlockUser, getEditUser, editUser };
