const mongoose = require("mongoose");


const UserDetails = mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Images: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("FileUploads", UserDetails);
