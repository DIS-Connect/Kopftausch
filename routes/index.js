var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
        res.render('index', { loggedIn: true });
    } else {
        res.render('index', { loggedIn: false });

    }
});

module.exports = router;

