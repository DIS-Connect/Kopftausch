let bcrypt = require("bcryptjs");
const fs = require("fs");

let anzUser = 100;


let MongoClient = require('mongodb').MongoClient;

let url = "mongodb://connect_mongoadmin:cah9aiKohc@localhost:31187/?authMechanism=SCRAM-SHA-1&authSource=admin";



MongoClient.connect(url, function (err, mongoClient) {
    if (err) throw err;
    let db = mongoClient.db("kopftauschdb");


    function generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    function hashpassword(password, cb) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    let inhalt = "";
    for (let i = 1; i <= anzUser; i++) {

        let password = generatePassword();
        let hashedPassword = hashpassword(password);

        db.collection("users").insert(
            {
                "userid": "user" + i,
                "password": hashedPassword,
                "nick": "",
                "message":"",
                "firstlogin":false,
                "tauschData":[]

            }, (err) => {
                if (err) throw err;

                inhalt += "user" + i + ": " + password + "\n";

                if (i === anzUser) {

                }
            }
        );
    }





    db.collection("users").insert(
        {
            "userid": "master",
            "password": "$2a$10$3WX6zNVLfv17k.G54irLSe7kXRZbgfejMBbG83DIOhdt0soV9Xtum",
            "nick": "Paul",
            "message":"",
            "firstlogin":false,
            "tauschData":[]

        }, (err) => {
            if (err) throw err;

        }
    );


    db.collection("users").insert(
        {
            "userid": "admin",
            "password":"$2a$12$nyBK7fBcwtoAY3rQCt6sruzNawssnrBd8/9t7LW73LRBeRj4OWVIK",
            "nick": "Paulchen",
            "message":"",
            "firstlogin":false,
            "tauschData":[]

        }, (err) => {
            if (err) throw err;

        }
    );


    db.collection("users").insert(
        {
            "userid": "master2",
            "password": "$2a$10$3WX6zNVLfv17k.G54irLSe7kXRZbgfejMBbG83DIOhdt0soV9Xtum",
            "nick": "Joshi Poposchi",
            "message":"",
            "firstlogin":false,
            "tauschData":[]

        }, (err) => {
            if (err) throw err;

        }
    );
    setTimeout(function () {
        console.log(inhalt);
        fs.writeFileSync("passwörter.txt", inhalt, (err) => {
            if (err) throw err;

            db.close();
        });
    }, anzUser * 100);

});

