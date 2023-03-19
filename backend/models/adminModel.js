const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

// static admin login method
adminSchema.statics.login = async function (email, password) {
  console.log(email);
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw Error("Incorrect email");
  }

  const match = password == admin.password;
  //await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
