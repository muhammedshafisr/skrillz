const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const handleError = (error, req, res) => {
  if(req?.path?.includes("search")){
    next();
  } else {
    console.log(error)
    res.status(401).json({ error: "Request is not authorized" });
  }
}

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization?.split(" ")[1];
  
  try {
    const _id = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id })

    if (user.status === "blocked") {
      res.status(403).json({ error: "Blocked" });
    }
    else {
      req.user = user._id
      next();
    }
  } catch (error) {
    handleError(error, res, req);
  }
};

const requireAdminAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization?.split(" ")[1];

  try {
    const _id = jwt.verify(token, process.env.SECRET);

    const user = await Admin.findOne({ _id })

      req.admin = user._id
      next();

  } catch (error) {
    console.log(error)
  }

}

module.exports = { requireAuth, requireAdminAuth};
