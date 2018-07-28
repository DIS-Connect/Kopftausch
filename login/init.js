var passwordLogin = require("./password_out");
var ObjectID = require("mongodb").ObjectID;
var initAuth = function (passport, db) {

   passport.serializeUser(function (user, done) {

        done(null, user._id);

    });
    passport.deserializeUser(function (id, done) {

        db.collection("users").findOne({"_id": ObjectID(id)}, function (err, user) {
            done(err, user);

        });

    });


    passwordLogin(passport, db)

};
module.exports = initAuth;