const express = require('express');
const app = express();
const server = process.env.PORT || 4000;
require("./db/db");
const Users = require("./Models/Users");
const Blogs = require("./Models/Post");
const UserDetails = require("./Models/Uploading");
const multer = require('multer') // Require pacakage of multer
let path = require("path"); //* Require Path For Multer / Templates Like HTML CSS



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("Public")); // For Asset Use IMAGES/CSS FOLDERS / JS FOLDERS

// Serve uploads statically
app.use('/uploads', express.static('Public/uploads')); // FOR UPLOAD PATH

//* Multer Code For Uploading Files
var storage = multer.diskStorage({
    destination: "./Public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage
}).single("file");



app.get("/", (req, res) => {
    res.send("APP START")
})



app.get("/adduser", (req, res) => {
    res.send("Register User Route")
})

app.post("/adduser", async (req, res) => {
    try {
        const id = "6707b7d867b753ff1794dc1f"
        const { username, email, password } = req.body;
        const NewUser = await new Users({ username, email, password, PostInfo: id }).save();
        console.log(NewUser)
    } catch (error) {
        console.log(error)
    }
})



app.get("/post", async (req, res) => {
    const id = "6707b79064d1b5e902630597";
    const myposts = await Users.find({}).populate("PostInfo");
    console.log(myposts);
    res.send(myposts)
})


app.post("/posts", async (req, res) => {
    try {
        const id = "6707b4902562550ab302141d";
        const { postname, postdata, } = req.body;
        const post = new Blogs({
            postname,
            postdata,
            UserInfo: id,  // Associate post with user
        });

        // Save the post to the database
        const posts = await post.save();
        console.log(posts)
        res.send("DATA ADDED")
    } catch (error) {
        console.log(error)
    }
})

app.post("/userdetails", upload, async (req, res) => {
    try {
        const { FullName } = req.body;
        const file = req.file.filename;

        // Save the full name and file info to the database
        const UserCreated = new UserDetails({ FullName, Images: file });
        const UserSave = await UserCreated.save();

        console.log(UserSave);
        res.send("User details added successfully!");
    } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong");
    }
});





app.listen(server, () => {
    console.log(`Server Start At Port Number ${server}`);
})