var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        if(req.user.firstlogin) {
            res.render('terms_of_use', {loggedIn: true, firstlogin: true});
        }else{
            res.render('terms_of_use', {firstlogin: false,loggedIn: false});
        }
    } else {
        res.render('terms_of_use', { loggedIn: false,firstlogin: true });
    }
});

module.exports = router;
