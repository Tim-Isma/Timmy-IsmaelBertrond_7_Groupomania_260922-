const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        maxlength: 500,
    },
    picture: {
        type: String
    },
    video: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    userLiked: {
        type: [String]
    },
    userDisliked: {
        type: [String]
    },
})

module.exports = monngoose.model('comment', commentSchema)