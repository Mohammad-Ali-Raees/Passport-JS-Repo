const express = require('express');
const app = express();
const server = process.env.PORT || 4000;
require("./db/db");
const Users = require("./Models/Users");


const passport = require("passport"); //*  passport library 
const express_session = require("express-session"); //* express session library
const { InitilaizePassport, IsAuthenticated } = require("./Passport Authentication/Passport"); //* passport function

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



InitilaizePassport(passport); //* Passport function
app.use(express_session({ secret: "helloali", resave: false, saveUninitialized: false })); // Express session
app.use(passport.initialize()); // passport intialize
app.use(passport.session()); // passport session





app.get("/", (req, res) => {
    res.send("APP START")
})

app.get("/profile", IsAuthenticated, (req, res) => {
    res.send(req.user)
    console.log(req.user);
})

app.get("/registerusers", (req, res) => {
    res.send("Register User Route")
})

app.post("/registerusers", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const NewUser = await new Users({ username, email, password }).save();
        console.log(NewUser)
    } catch (error) {
        console.log(error)
    }
})


app.get("/login", (req, res) => {
    res.send("login route")
})

app.post("/login", passport.authenticate("local", { failureRedirect: "/home", successRedirect: "/profile" }), async (req, res) => {

})


app.listen(server, () => {
    console.log(`Server Start At Port Number ${server}`);
})