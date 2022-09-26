const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true,
        unique: true
    },
    pseudo: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    },
    password: {
        type: String,
        maxLength: 20,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    likeProfile: {
        type: [String]
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
})

module.exports = mongoose.model('user', userSchema)