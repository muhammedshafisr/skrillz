const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  Types: { ObjectId },
} = mongoose;

const reportVideoSchema = new Schema(
  {
    videoId: {
      type: ObjectId,
      required: true,
    },
    reporterId: {
        type: String,
        required: true
    },
    uploader: {
      type: String,
      required: true
    },
    reports: {
        select: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportVideoSchema);
