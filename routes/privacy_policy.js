var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        if(req.user.firstlogin) {
            res.render('privacy_policy', {loggedIn: true, firstlogin: true});
        }else{
            res.render('privacy_policy', {firstlogin: false,loggedIn: false});
        }
    } else {
        res.render('privacy_policy', { loggedIn: false,firstlogin: true });
    }
});

module.exports = router;
