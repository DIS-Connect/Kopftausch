var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        if(req.user.firstlogin) {
            res.render('how', {loggedIn: true, firstlogin: true});
        }else{
            res.render('how', {firstlogin: false,loggedIn: false});
        }
    } else {
        res.render('how', { loggedIn: false,firstlogin: true });
    }

});

module.exports = router;

