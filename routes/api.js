var express = require('express');
var router = express.Router();
var ObjectID = require("mongodb").ObjectID;
var isAuthenticated = require("../login/isAuthenticated");
var app = express();

/* GET home page. */
router.post('/settings/nick',  isAuthenticated.checkSession, function (req, res, next) {
    let db = req.app.get("db");
    db.collection("users").update({"_id": ObjectID(req.user._id)}, {$set: {"nick": req.body.nick}}, (err, dbRes) => {
        if (err) {
            res.status(500).send("Error in DB");
        } else {
            res.send("OK");
            console.log(req.user.nick);
        }
    });
});

router.post('/settings/getnick',  isAuthenticated.checkSession, function (req, res) {
    res.send(req.user.nick);
});

router.post('/settings/kurse_speichern',  isAuthenticated.checkSession, function (req, res, next) {
    let db = req.app.get("db");
    db.collection("users").update({"_id": ObjectID(req.user._id)}, {$set: {"tauschData": req.body}}, (err, dbRes) => {
        if (err) {
            res.status(500).send("Error in DB");
        } else {
            res.send("OK");
        }
    });

});

router.post('/settings/getfields',  isAuthenticated.checkSession, function (req, res) {
    res.send(req.user.tauschData);
});

router.post('/settings/deleteAccount', function (req, res) {
    let db = req.app.get("db");

    db.collection("users").deleteOne({"_id":ObjectID(req.user._id)}, function (err){
        if(err) res.status(500).send("Server error");
        else res.send("ok");
    });

});

router.post('/settings/deleteData',  isAuthenticated.checkSession, function (req, res) {
    let db = req.app.get("db");

    db.collection("users").update({"_id":ObjectID(req.user._id)},{$set:{"nick":"", "tauschData": []}}, function (err){

        if(err) res.status(500).send("Server error");
        else res.send("ok");



    });



});

router.post('/settings/firstlogin',  isAuthenticated.checkSession, function (req, res) {

        let db = req.app.get("db");

        if(req.body.cb1 === "true"&& req.body.cb2 === "true") {
            db.collection("users").update({"_id": ObjectID(req.user._id)}, {$set: {"firstlogin": true}}, function (err) {
            res.send("ok");
            });

        }else{

        }

});

router.post('/settings/getuser',  isAuthenticated.checkSession, function (req, res) {
    let db = req.app.get("db");

    var userarray = [];
    var sessions = req.sessionStore.sessions;
    console.log(sessions);

    var result = Object.keys(sessions).map(function (key) {
        return [sessions[key]];
    });
//    console.log("result: " + result + "||");


    result.forEach(function (user) {
        //  console.log("ichbintoll");
        user = JSON.parse(user)
        console.log(user);
        user = user.passport.user;
        console.log(user);
        if (user !== undefined) {
            db.collection("users").findOne({"_id": ObjectID(user)}, function (err, userr) {
                userarray.push(userr.nick);
                console.log(userarray);
            });
        }


    });

    setTimeout(function () {
        res.send(userarray);
    }, 200);

});

router.post('/settings/sendmessage',  isAuthenticated.checkSession, function (req, res) {

    if(req.user.userid === "master" || req.user.userid === "admin"|| req.user.userid === "master2") {
        let db = req.app.get("db");

        var user = req.body.user;
        var message = req.body.message;

        db.collection("users").update({"userid": user}, {$set: {"message": message}}, function (err) {

            if (err) {
                res.status(500).send("Error in DB");
            } else {
                res.send("OK");
            }


        });


    }else{
        res.send("lappen");
    }



});

module.exports = router;

