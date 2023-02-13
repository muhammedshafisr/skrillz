const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;
  
  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
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
    if(req.path.includes("search")){
      next();
    } else {
      res.status(401).json({ error: "Request is not authorized" });
    }
  }
};

module.exports = requireAuth;
