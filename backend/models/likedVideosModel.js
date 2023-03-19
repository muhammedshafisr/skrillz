const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  Types: { ObjectId },
} = mongoose;

const likedVideoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    likedVideo: [
      {
        video: {
          type: ObjectId,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("LikedVideo", likedVideoSchema);
