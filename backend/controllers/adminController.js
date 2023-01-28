const Admin = require("../models/adminModel");
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

module.exports = { loginAdmin };
