var express = require('express');
const isAuthenticated = require("../login/isAuthenticated");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        if(req.user.firstlogin) {
            res.render('impressum', {loggedIn: true, firstlogin: true});
        }else{
            res.render('impressum', {firstlogin: false,loggedIn: false});
        }
    } else {
        res.render('impressum', { loggedIn: false,firstlogin: true });
    }

});

module.exports = router;
