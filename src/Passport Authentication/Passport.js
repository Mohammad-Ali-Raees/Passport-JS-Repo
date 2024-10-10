const LocalStrategy = require("passport-local").Strategy;
const Users = require("../Models/Users");
const MyPassport = require("passport")
exports.InitilaizePassport = (passport) => {
    try {
        passport.use(new LocalStrategy(
            async function (email, password, done) {
                const user = await Users.findOne({ email });

                if (!user) { return done(null, false); } //* Not Exists user then return false
                if (user.password !== password) { return done(null, false); } //* not math password then return false
                return done(null, user); //* user find that next() will call
            }
        ));
    } catch (error) {
        console.log(error); //* throw error
    }


};



MyPassport.serializeUser((user, done) => { //* its manadatory to write 
    done(null, user.id);
});

MyPassport.deserializeUser(async (id, done) => { //* its mandatory to write 
    try {
        // Await the result of the user retrieval
        const users = await Users.findById(id);
        done(null, users);
    } catch (error) {
        done(error);
    }
});


//* check if user login then access profile route other wise redirect back to login
//* Its an protect route checker
exports.IsAuthenticated = (req, res, next) => { 

    if (req.user) return next();

    res.render("/login");
}