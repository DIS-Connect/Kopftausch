//Express
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var express_session = require("express-session");
var bodyParser = require("body-parser");
var app = express();

//Authentication
var passport = require("passport");
var initAuth = require("./login/init");
var isAuthenticated = require("./login/isAuthenticated");

// Router
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var settingsRouter = require('./routes/settings');
var matchesRouter = require('./routes/matches');
var contactRouter = require('./routes/contact');
var impressumRouter = require('./routes/impressum');
var privacy_policyRouter = require('./routes/privacy_policy');
var terms_of_useRouter = require('./routes/terms_of_use');
var logoutRouter = require('./routes/logout');
var APIRouter = require('./routes/api');
var masterRouter = require('./routes/master');
var howRouter = require('./routes/how');
var accountRouter = require('./routes/account');
var bedingungenRouter = require('./routes/bedingungen');

//MongoDB
var MongoClient = require('mongodb').MongoClient;
let url = "mongodb://connect_mongoadmin:cah9aiKohc@localhost:31187/?authMechanism=SCRAM-SHA-1&authSource=admin";

MongoClient.connect(url, function (err, mongoClient) {
    if (err) throw err;
    var db = mongoClient.db("kopftauschdb");


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.set("db", db);
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(express_session({
        secret: "lajs98czahj32sd2",
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    initAuth(passport, db);
    app.use(passport.session());

    app.post("/login", passport.authenticate("local", {

        successRedirect: "/bedingungen",
        failureRedirect: "/login"
    }));
    app.post("/checkLogin", isAuthenticated.checkSession, function (req, res) {
        res.send(req.user);
    });


    //Express Routes
    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/settings', settingsRouter);
    app.use('/impressum', impressumRouter);
    app.use('/settings', settingsRouter);
    app.use('/matches', matchesRouter);
    app.use('/terms_of_use', terms_of_useRouter);
    app.use('/privacy_policy', privacy_policyRouter);
    app.use('/contact', contactRouter);
    app.use('/logout', logoutRouter);
    app.use('/api', APIRouter);
    app.use('/master', masterRouter);
    app.use('/how', howRouter);
    app.use('/account', accountRouter);
    app.use('/bedingungen', bedingungenRouter);
    app.use('/*', indexRouter);

    // JSON kurse
    app.locals.kurse = require("./kurse");


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });


});
module.exports = app;