const mongoose = require("mongoose");
const { Types: {
  ObjectId
}} = mongoose
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    community: {
      type: ObjectId,
      required: true,
    },
    chatting: [
      {
        sender: {
          type: String,
        },
        img: {
          type: String
        },
        text: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
