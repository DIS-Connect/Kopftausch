var bcrypt = require("bcryptjs");
var LocalStrategy = require("passport-local").Strategy;
var passwordLogin = function(passport, db) {
    passport.use(new LocalStrategy({
        usernameField: "userid",
        passwordField: "userpwd"
    }, function (userid, password, done) {
        console.log(userid);
        db.collection("users").findOne({"userid": userid}, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                console.log("User Not Found");
                return done(null, false, {message: "User not found"});
            }
            if(!isValidPassword(user.password, password)){
                return done(null, false, {message:"invalid Password"});
            }else{

            }
            return done(null, user);
        })
    }));
    const isValidPassword = function (dbPasswordHash, passportPassword) {
        return bcrypt.compareSync(passportPassword, dbPasswordHash)


    }
};
module.exports = passwordLogin;