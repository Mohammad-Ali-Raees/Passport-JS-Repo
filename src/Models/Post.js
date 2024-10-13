const mongoose = require("mongoose");


const Posts = mongoose.Schema({
    postname: {
        type: String,
        required: true
    },
    postdata: {
        type: String,
        required: true
    },
    UserInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
       
    }, // Reference to User schema
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = new mongoose.model("Posts", Posts);