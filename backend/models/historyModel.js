const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types: {
    ObjectId
}} = mongoose

const HistorySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videos: {
      type: Array,
      required: true,
        id: ObjectId,
        date: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", HistorySchema);
