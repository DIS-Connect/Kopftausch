var express = require('express');
var isAuthenticated = require("../login/isAuthenticated");
var router = express.Router();
var kurse = require("../kurse");

/* GET home page. */
function compare2(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            return true
        }
    }
    return false
}

function getFach(kuerzel) {

    for (var i = 0; i < kurse.Kurse.length; i++) {

        if (kurse.Kurse[i].Kuerzel === kuerzel) {
            return kurse.Kurse[i].Fach;
        }
    }

}

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

router.get('/', isAuthenticated.checkSession, function (req, res, next) {
    if(req.user.firstlogin) {

    let db = req.app.get("db");
    let wunscharray = [];
    let lehrerarray = [];
    let responsearry = [];
    req.user.tauschData.forEach(function (lehrer) {
        lehrerarray.push(lehrer.lehrer);

        lehrer.wunsch.forEach(function (wunsch) {
            wunscharray.push(wunsch)
        });

    });

    db.collection("users").find({}).toArray((err, users) => {
        for (const userI in users) {
            let user = users[userI];
            let userWunschL = [];
            for (let FachI in user.tauschData) {
                const fach = user.tauschData[FachI];
                for(let FachWunschI in fach.wunsch) {
                    userWunschL.push(fach.wunsch[FachWunschI]);
                }
            }
            for (let userTauschDataI in user.tauschData) {
                let fach = user.tauschData[userTauschDataI];
                if (wunscharray.includes(fach.lehrer)) {
                        if (compare2(userWunschL, lehrerarray)) {

                            responsearry.push({
                                Fach: getFach(fach.lehrer.split("_")[1]),
                                wunschlehrer: fach.lehrer.split("_")[0],
                                tauschpartner: user.nick
                            });
                        }
                    }
                }
            }
        });

    setTimeout(function () {
        let sortedResponseArray = [];
        for (let kursI in kurse.Kurse) {
            let kursArray = [];
            const kurs = kurse.Kurse[kursI];
            for (let resArrayI in responsearry) {
                const responseArrayObject = responsearry[resArrayI];
                if (responseArrayObject.Fach === kurs.Fach) {
                    kursArray.push(responseArrayObject);
                }
            }
            shuffleArray(kursArray);
            sortedResponseArray = sortedResponseArray.concat(kursArray);
        }
        setTimeout(function () {
            res.render('matches', {tausche: sortedResponseArray,loggedIn:true});
        }, 100)
    }, 100);
    }else{
        res.redirect("/bedingungen");
    }
});

module.exports = router;
