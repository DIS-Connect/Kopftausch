var express = require('express');
var router = express.Router();
var kurse = require("../kurse.json");
var isAuthenticated = require("../login/isAuthenticated");

/* GET home page. */
router.get('/',  isAuthenticated.checkSession, function(req, res, next) {
    let db = req.app.get("db");

if(req.user.firstlogin) {
    let message = req.user.message;
    db.collection("users").update({"userid": req.user.userid}, {$set: {"message": ""}}, function (err) {

        if (err) {
            res.status(500).send("Error in DB");
        } else {
            if(req.user.userid === "master"|| req.user.userid === "admin" ||req.user.userid === "master2"  ){

                res.render('settings', {loggedIn: true, message: message, master:true});
            }else {
                res.render('settings', {loggedIn: true, message: message, master:false});
            }
        }


    });

}else{
    res.redirect("/bedingungen");
}

});

module.exports = router;
