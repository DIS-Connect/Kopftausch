var express = require('express');
const isAuthenticated = require("../login/isAuthenticated");
var router = express.Router();


router.get('/',  isAuthenticated.checkSession, function(req, res, next) {
    let db = req.app.get("db");

    if(req.user.firstlogin){
        res.redirect("/settings");
    }else {


                res.render('bedingungen', {loggedIn: false});




    }
});

module.exports = router;
