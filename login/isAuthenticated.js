module.exports.checkSession = function (req, res, next) {
    if(req.user) {
        console.log(req.user.password);
        return next();
    } else {
        res.redirect("/");
    }
};