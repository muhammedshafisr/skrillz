const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types: { ObjectId }} = mongoose;


const liveSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    streaming: {
        type: Boolean,
        required: true
    },
    url: {
      type: String
    },
    status: {
      type: Boolean,
      required: true
    },
}, {timestamps: true});

// static setting video method
liveSchema.statics.setLive = async function (
    userId, thumbnail, description
  ) {
    
    try{
      const response = await this.create({
        userId,
        thumbnail,
        description,
        streaming: false,
        status: true
      });
  
    return response;
  
    } catch(error) {
      return new Error(error);
    }
    
  };
  
module.exports = mongoose.model("liveNow", liveSchema);