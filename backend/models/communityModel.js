const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema(
  {
    admin: {
        type: String,
        required: true
    },
    communityName: {
        type: String,
        required: true
    },
    members: {
      type: Array,
    },
    status: {
      type: Boolean,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", CommunitySchema);