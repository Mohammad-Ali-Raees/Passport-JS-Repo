const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Passport").then(e => {
    console.log(`Database Connected Successfully`)
}).catch(error => {
    console.log(`Some Error Occured ${error}`);

})