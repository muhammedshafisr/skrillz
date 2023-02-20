const jwt = require("jsonwebtoken");


module.exports = (_id) => jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });