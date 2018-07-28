var express = require('express');
var isAuthenticated = require("../login/isAuthenticated");
var router = express.Router();
var kurse = require("../kurse");
var app = express();

router.get('/', isAuthenticated.checkSession, function(req, res, next) {
    let db = req.app.get("db");


   if(req.user.userid === "master" ||req.user.userid === "admin"||req.user.userid === "master2"  ){

        db.collection("users").find({}).toArray((err,user)=>{
            res.render('master', {users: user});
        });

    }else{
        res.render("index", {loggedIn: false});
    }

});

module.exports = router;