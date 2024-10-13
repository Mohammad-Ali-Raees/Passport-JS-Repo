const mongoose = require("mongoose");


const UsersSchema =  mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    PostInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts', 
       
    },
})

module.exports = new mongoose.model("Users",UsersSchema);