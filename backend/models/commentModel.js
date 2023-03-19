const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: {ObjectId}} = mongoose;


const commentSchema = new Schema({
    videoId: {
        type: ObjectId,
        required: true
    },
    chat: [{
        commenter: {
            type: String,
            required: true
        },
        commenterImage: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});

module.exports = mongoose.model('comments', commentSchema);
