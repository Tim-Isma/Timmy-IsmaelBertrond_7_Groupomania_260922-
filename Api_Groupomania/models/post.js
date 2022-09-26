const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    post: {
        type: String,
        maxlength: 500
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

module.exports = mongoose.model('post', postSchema)