const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");


const userVerification = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});




// static signup method
userVerification.statics.verification = async function (
    email,
    password,
    phone,
    firstname,
    lastname
  ) {
    // validation
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    const exists = await User.findOne({ $or: [{ email }, { phone }] });
  
    if (exists) {
      throw Error("Email or phone already in use");
    }
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const user = await this.create({
      email,
      password: hash,
      firstname,
      lastname,
      phone,
      verified: false
    });
  
    return user;
  };


module.exports = mongoose.model("UserVerification", userVerification);
