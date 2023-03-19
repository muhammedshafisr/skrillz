const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    video: 
      {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        cloudinaryId: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
          required: true,
        },
        likes: [{
          type: String
        }],
        disLikes: {
          type: Array
        },
        status: {
          type: Boolean,
          required: true
        }
      },
  },
  { timestamps: true }
);

// static setting video method
uploadSchema.statics.setVideo = async function (
  userId,
  name,
  url,
  cloudinaryId,
  description,
  thumbnail,
  category
) {
  
  try{
  //   const exists = await this.findOne({ userId });
  
  // if (exists) {
  //   const response = await this.findOneAndUpdate(
  //     { userId },
  //     { $push: { videos: { name, url, cloudinaryId, description, thumbnail } } },
  //     { returnDocument: "after" }
  //   );
  //     console.log(response)
  //   return response;
  // }
  
  // if doesn't exist ..
  const response = await this.create({
    userId,
    category,
    video: {
      name,
      url,
      cloudinaryId,
      description,
      thumbnail,
      status: false
    }
  });
  } catch(error) {
    return new Error(error);
  }
  
};

module.exports = mongoose.model("upload", uploadSchema);