var express = require('express');
const isAuthenticated = require("../login/isAuthenticated");
var router = express.Router();

/* GET home page. */
router.get('/', isAuthenticated.checkSession,function(req, res, next) {
    if (req.user) {
        res.render('account', { loggedIn: true });
    } else {
        res.render('account', { loggedIn: false });
    }
});

module.exports = router;
