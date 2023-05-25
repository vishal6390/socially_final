const mongoose = require("mongoose")

const UserSchema=new mongoose.Schema({
    username: {
        type: String,
    },
    email:{
        type: String
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
        default: 0
    },
    dateOfBirth: {
        type:String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    friends:{
        type: [String],
    },
    requests: {
        type: [String],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('User',UserSchema);
